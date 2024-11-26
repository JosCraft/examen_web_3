from typing import Optional

from pydantic import BaseModel

class Articulo(BaseModel):
    idArticulo: Optional[int] = None
    nombre:str
    tipo:str
    marca:str
    precio:float
    cantidad:int
    proveedor:str
    codigoBarra:str

    