from dataclasses import dataclass
from typing import Optional
from pydantic import BaseModel


@dataclass
class userDTO(BaseModel):
    id: Optional[int]
    nombre: str
    medida: str
