from typing import Optional

from pydantic import BaseModel
from datetime import date

class User(BaseModel):
    correo:str
    nombre:str
    contrasena:str
    fechaRegistro:date