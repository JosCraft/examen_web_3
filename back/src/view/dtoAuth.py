from dataclasses import dataclass
from typing import Optional
from pydantic import BaseModel


@dataclass
class authDTO(BaseModel):
    correo: str
    contrasena: str
