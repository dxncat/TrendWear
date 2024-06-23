from fastapi import APIRouter, HTTPException, status
from bson import ObjectId
from passlib.context import CryptContext
import models.User as user_entity
from db.client import db_client
from db.schemas.user_schema import user_schema, users_schema

router = APIRouter(prefix="/tiendas",
                   tags=["usuarios"],
                   responses={404: {"message": "No encontrado"}})

@router.get("/")
async def tiendas():
    return users_schema(db_client.users.find({"es_tienda": True}))

@router.get("/{tienda}")
async def read_tienda(tienda: str):
    return user_entity.User.search_user("nickname", tienda)