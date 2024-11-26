from fastapi import APIRouter, Depends, HTTPException, status
from src.controllers.articulos_controller import ArticuloController
from src.models.articulo_model import Articulo

# Crear el router para los endpoints relacionados con "articulo"
articulo_router = APIRouter(prefix="/api/v1", tags=["articulos"])

@articulo_router.get("/articulos", response_model=list[Articulo])
async def get_articulos(articulo_controller: ArticuloController = Depends()):
    """
    Obtener la lista de todos los artículos.
    """
    return await articulo_controller.get_all()

@articulo_router.get("/articulos/{id}", response_model=Articulo)
async def get_articulo(id: int, articulo_controller: ArticuloController = Depends()):
    """
    Obtener un artículo por su ID.
    """
    articulo = await articulo_controller.get(id)
    if not articulo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Artículo con ID {id} no encontrado")
    return articulo

@articulo_router.post("/articulos", response_model=Articulo, status_code=status.HTTP_201_CREATED)
async def create_articulo(articulo: Articulo, articulo_controller: ArticuloController = Depends()):
    """
    Crear un nuevo artículo.
    """
    return await articulo_controller.create(articulo)

@articulo_router.put("/articulos/{id}", response_model=Articulo)
async def update_articulo(id:int ,articulo: Articulo, articulo_controller: ArticuloController = Depends()):
    """
    Actualizar un artículo existente por su ID.
    """
    updated_articulo = await articulo_controller.update(id, articulo)
    if not updated_articulo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Artículo con ID {id} no encontrado")
    return updated_articulo

@articulo_router.delete("/articulos/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_articulo(id: int, articulo_controller: ArticuloController = Depends()):
    """
    Eliminar un artículo por su ID.
    """
    articulo = await articulo_controller.get(id)
    if not articulo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Artículo con ID {id} no encontrado")
    await articulo_controller.delete(id)
