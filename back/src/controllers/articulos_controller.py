#ver todos, ver by id, crear, actualizar, eliminar
from src.models.articulo_model import ArticuloDomain
from src.core.connection import get_connection
class usuarioController():
    def __init__(self):
        self.connetion = get_connection()


async def get(self, idArticulo: int) -> ArticuloDomain:
    try:
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM web_articulo_de_oficina WHERE idArticulo=%s", (idArticulo,))
            result = cursor.fetchone()
            if result:
                return ArticuloDomain(
                    idArticulo=result['idArticulo'],
                    nombre=result['nombre'],
                    tipo=result['tipo'],
                    marca=result['marca'],
                    precio=result['precio'],
                    cantidad=result['cantidad'],
                    proveedor=result['proveedor'],
                    codigoBarra=result['codigo_barra'],
                )
    except Exception as error:
        print(f"Error: {error}")
    return None
    
async def create(self, articulo: ArticuloDomain) -> ArticuloDomain:
    try:
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute(
                """
                INSERT INTO web_articulo_de_oficina (nombre, tipo, marca, precio, cantidad, proveedor, codigo_barra)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    articulo.nombre,
                    articulo.tipo,
                    articulo.marca,
                    articulo.precio,
                    articulo.cantidad,
                    articulo.proveedor,
                    articulo.codigoBarra
                )
            )
            self.connection.commit()
            cursor.execute("SELECT LAST_INSERT_ID() AS idArticulo")
            result = cursor.fetchone()
            if result:
                return await self.get(result['idArticulo'])
    except Exception as error:
        print(f"Error: {error}")
    return None

async def update(self, idArticulo: int, articulo: ArticuloDomain) -> ArticuloDomain:
    try:
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute(
                """
                UPDATE web_articulo_de_oficina
                SET nombre = %s, tipo = %s, marca = %s, precio = %s, cantidad = %s, proveedor = %s, codigo_barra = %s
                WHERE idArticulo = %s
                """,
                (
                    articulo.nombre,
                    articulo.tipo,
                    articulo.marca,
                    articulo.precio,
                    articulo.cantidad,
                    articulo.proveedor,
                    articulo.codigoBarra,
                    idArticulo
                )
            )
            self.connection.commit()
            if cursor.rowcount > 0:  
                return await self.get(idArticulo)
            return None
    except Exception as error:
        print(f"Error: {error}")
        return None

async def delete(self, idArticulo: int) -> bool:
    try:
        with self.connection.cursor() as cursor:
            cursor.execute("DELETE FROM web_articulo_de_oficina WHERE idArticulo = %s", (idArticulo,))
            self.connection.commit()
            return cursor.rowcount > 0 
    except Exception as err:
        print(f"Error: {err}")
        return False

async def get_all(self) -> list[ArticuloDomain]:
    try:
        lista_articulos = []
        with self.connection.cursor(dictionary=True) as cursor:
            cursor.execute("SELECT * FROM web_articulo_de_oficina")
            result = cursor.fetchall()
            for row in result:
                lista_articulos.append(
                    ArticuloDomain(
                        idArticulo=row['idArticulo'],
                        nombre=row['nombre'],
                        tipo=row['tipo'],
                        marca=row['marca'],
                        precio=row['precio'],
                        cantidad=row['cantidad'],
                        proveedor=row['proveedor'],
                        codigoBarra=row['codigo_barra']
                    )
                )
        return lista_articulos
    except Exception as error:
        print(f"Error: {error}")
        return []
