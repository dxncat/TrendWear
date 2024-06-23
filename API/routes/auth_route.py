from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from decouple import config
import models.User as user_entity
from db.client import db_client
from db.schemas.user_schema import user_schema
from auth.auth_user import current_user

router = APIRouter(tags=["auth"],
                   responses={404: {"message": "No encontrado"}})

ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 4
SECRET_KEY = config("SECRET_KEY")

crypt_context = CryptContext(
        schemes=["bcrypt"],
        deprecated="auto"
    )
                   
@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = db_client.users.find_one({"nickname": form.username})
    if not user_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Usuario no encontrado")
    user = user_entity.User(**user_schema(user_db))
    if not crypt_context.verify(form.password, user_db["contraseña"]):
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")
    access_token = jwt.encode(
        {
            "sub": user.nickname,
            "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_DURATION)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register", status_code=201)
async def register(usuario: user_entity.User):
    if db_client.users.find_one({"nickname": usuario.nickname}) or db_client.users.find_one({"correo": usuario.correo}):
        raise HTTPException(status_code=400, detail="Nombre de usuario o correo ya registrado")
    user_dict = dict(usuario)
    del user_dict["id"]
    user_dict["contraseña"] = crypt_context.hash(user_dict["contraseña"])
    db_client.users.insert_one(user_dict)
    access_token = jwt.encode(
        {
            "sub": usuario.nickname,
            "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_DURATION)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me")
async def read_users_me(user: user_entity.User = Depends(current_user)):
    return user