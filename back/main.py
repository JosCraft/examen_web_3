import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.view.articulo_view import articulo_router
from src.view.user_view import user_controller
from src.view.auth_view import auth_router

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(articulo_router)
app.include_router(user_controller)
app.include_router(auth_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000,log_level="debug")
