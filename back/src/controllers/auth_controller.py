from mysql.connector import pooling, Error
from src.core.connection import get_connection
from src.models.user_model import User
from src.services.jwt_service import generar_token
from src.services.hash_service import verify_password


class AuthController:

    def __init__(self):
        self.connection = get_connection()  


    async def login(self, correo: str, contrasena: str) -> str | None:
        """
        Validar usuario y contraseña para iniciar sesión y generar un token.
        """
        try:
            with self.connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM login WHERE correo = %s", (correo,))
                user_data = cursor.fetchone()
                if user_data and verify_password(contrasena, user_data['password_hash']):
                    user = User(
                        correo=user_data['correo'],
                        nombre=user_data['nombre_completo'],
                        contrasena=user_data['password_hash'],
                        fechaRegistro=user_data['registration_date'],
                    )
                    return generar_token(user_data['correo'],user_data['nombre_completo'])  # Generar token en caso de éxito
        except Exception as error:
            print(f"Error en login: {error}")
        return None

