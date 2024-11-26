from src.models.user_model import User
from src.core.connection import get_connection
from src.services.hash_service import hash_password

class UsuarioController:
    def __init__(self):
        self.connection = get_connection()

    async def get(self, correo: str) -> User | None:
        """
        Obtener un usuario por correo.
        """
        try:
            with self.connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM login WHERE correo = %s", (correo,))
                result = cursor.fetchone()
                if result:
                    return User(
                        correo=result['correo'],
                        nombre=result['nombre_completo'],
                        contrasena=result['password_hash'],
                        fechaRegistro=result['registration_date'],
                    )
        except Exception as error:
            print(f"Error en get: {error}")
        return None

    async def create(self, user: User) -> User | None:
        """
        Crear un nuevo usuario con una contraseña protegida por hash.
        """
        try:
            hashed_password = hash_password(user.contrasena)  # Generar hash de la contraseña
            with self.connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO login (correo, nombre_completo, password_hash, registration_date)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (
                        user.correo,
                        user.nombre,
                        hashed_password,  # Guardar el hash en lugar de la contraseña en texto plano
                        user.fechaRegistro,
                    )
                )
                self.connection.commit()
                return await self.get(user.correo)
        except Exception as error:
            print(f"Error en create: {error}")
            return None

    async def update(self, correo: str, user: User) -> User | None:
        """
        Actualizar un usuario existente basado en el correo.
        """
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE login
                    SET nombre_completo = %s, password_hash = %s
                    WHERE correo = %s
                    """,
                    (
                        user.nombre,
                        hash_password(user.contrasena),  # Actualizar la contraseña con su hash
                        correo,
                    )
                )
                self.connection.commit()
                if cursor.rowcount > 0:  # Verifica si hubo cambios en la base de datos
                    return await self.get(correo)
        except Exception as error:
            print(f"Error en update: {error}")
        return None

    async def delete(self, correo: str) -> bool:
        """
        Eliminar un usuario por correo.
        """
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("DELETE FROM login WHERE correo = %s", (correo,))
                self.connection.commit()
                return cursor.rowcount > 0  # Retorna True si se eliminó algún registro
        except Exception as error:
            print(f"Error en delete: {error}")
            return False

    async def get_all(self) -> list[User]:
        """
        Obtener todos los usuarios.
        """
        try:
            user_list = []
            with self.connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM login")
                result = cursor.fetchall()
                for row in result:
                    user_list.append(
                        User(
                            correo=row['correo'],
                            nombre=row['nombre_completo'],
                            contrasena=row['password_hash'],
                            fechaRegistro=row['registration_date'],
                        )
                    )
            return user_list
        except Exception as error:
            print(f"Error en get_all: {error}")
            return []
