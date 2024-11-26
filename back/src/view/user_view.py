from fastapi import APIRouter, Depends, HTTPException, status
from src.controllers.usuario_controller import UsuarioController
from src.models.user_model import User

user_controller = APIRouter(prefix="/api/v1", tags=["user"])

@user_controller.get("/user", response_model=list[User])
async def get_users(usuario_controller: UsuarioController = Depends()):
    """
    Obtener la lista de todos los usuarios.
    """
    users = await usuario_controller.get_all()
    return users

@user_controller.get("/user/{correo}", response_model=User)
async def get_user(correo: str, usuario_controller: UsuarioController = Depends()):
    """
    Obtener un usuario por su correo.
    """
    user = await usuario_controller.get(correo)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@user_controller.post("/user", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(user: User, usuario_controller: UsuarioController = Depends()):
    """
    Crear un nuevo usuario.
    """
    new_user = await usuario_controller.create(user)
    if not new_user:
        raise HTTPException(status_code=400, detail="No se pudo crear el usuario")
    return new_user

@user_controller.put("/user/{correo}", response_model=User)
async def update_user(correo: str, user: User, usuario_controller: UsuarioController = Depends()):
    """
    Actualizar un usuario existente por su correo.
    """
    updated_user = await usuario_controller.update(correo, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail=f"Usuario con correo {correo} no encontrado")
    return updated_user

@user_controller.delete("/user/{correo}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(correo: str, usuario_controller: UsuarioController = Depends()):
    """
    Eliminar un usuario por su correo.
    """
    user = await usuario_controller.get(correo)
    if not user:
        raise HTTPException(status_code=404, detail=f"Usuario con correo {correo} no encontrado")
    success = await usuario_controller.delete(correo)
    if not success:
        raise HTTPException(status_code=400, detail=f"No se pudo eliminar el usuario con correo {correo}")
    return None
