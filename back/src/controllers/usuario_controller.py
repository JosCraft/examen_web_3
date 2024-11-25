#Crear, Ver todos, Ver por iD, Actualizar, El}
from src.models.user_model import UserDomain
from src.core.connection import get_connection

class usuarioController():
    def __init__(self):
        self.connetion = get_connection()

async def get(self, idUsuario: int) -> UserDomain:
    try:
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM login WHERE idProducto=%s", (id,))
            result = cursor.fetchone()
            if result:
                return UserDomain(
                    idUsuario=result['idUsuario'],
                    correo=result['correo'],
                    nombre=result['nombre_completo'],
                    contrasena=result['password_hash'],
                    fechaRegistro=result['registration_date'],
                )
    except Exception as error:
        print(f"Error: {error}")
    return None

async def create(self, user: UserDomain) -> UserDomain:
    try:
        with self.connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO login (correo, nombre_completo, password_hash, registration_date)
                VALUES (%s, %s, %s, %s)
                """,
                (
                    user.correo,
                    user.nombre,
                    user.contrasena,
                    user.fechaRegistro
                )
            )
            self.connection.commit()
            cursor.execute("SELECT LAST_INSERT_ID()")
            last_id = cursor.fetchone()[0]
            return await self.get(last_id)
    except Exception as error:
        print(f"Error: {error}")
        return None


async def update(self, idUsuario: int, user: UserDomain) -> UserDomain:
    try:
        with self.connection.cursor() as cursor:
            cursor.execute(
                """
                UPDATE login
                SET correo = %s, nombre_completo = %s, password_hash = %s
                WHERE idUsuario = %s
                """,
                (
                    user.correo,
                    user.nombre,
                    user.contrasena,
                    idUsuario
                )
            )
            self.connection.commit()
            if cursor.rowcount > 0:
                return await self.get(idUsuario) 
            return None
    except Exception as error:
        print(f"Error: {error}")
        return None


async def delete(self, idUsuario: int) -> None:
    try:
        with self.connection.cursor() as cursor:
            cursor.execute("DELETE FROM login WHERE idUsuario = %s", (idUsuario,))
            self.connection.commit()
            return cursor.rowcount > 0
    except Exception as err:
        print(f"Error: {err}")
        return False


async def get_all(self) -> list[UserDomain]:
    try:
        user_list = []
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM login")
            result = cursor.fetchall()
            for row in result:
                user_list.append(
                    UserDomain(
                        idUsuario=row['idUsuario'],
                        correo=row['correo'],
                        nombre=row['nombre_completo'],
                        contrasena=row['password_hash'],
                        fechaRegistro=row['registration_date']
                    )
                )
        return user_list
    except Exception as error:
        print(f"Error: {error}")
        return []
