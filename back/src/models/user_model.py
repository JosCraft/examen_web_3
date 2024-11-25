from typing import Optional

from pydantic import BaseModel

class UserDomain(BaseModel):
    idUsuario: Optional[int] = None
    correo:str
    nombre:str
    contrasena:str
    fechaRegistro:str