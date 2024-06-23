from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_route, items_route, users_route, stores_route

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:5173"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
)
#rutas
app.include_router(items_route.router)
app.include_router(users_route.router)
app.include_router(auth_route.router)
app.include_router(stores_route.router)

@app.get("/")
async def read_root():
    return {"Mensaje": "Todo se ve en orden por aquí!"}
