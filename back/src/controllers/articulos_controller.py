from src.models.articulo_model import Articulo
from src.core.connection import get_connection

class ArticuloController:
    def __init__(self):
        self.connection = get_connection()  # Corrige el nombre del atributo

    async def get(self, idArticulo: int) -> Articulo | None:
        """
        Obtener un artículo por ID.
        """
        try:
            with self.connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM web_articulos_de_oficina WHERE id = %s", (idArticulo,))
                result = cursor.fetchone()
                if result:
                    return Articulo(
                        idArticulo=result['id'],
                        nombre=result['nombre'],
                        tipo=result['tipo'],
                        marca=result['marca'],
                        precio=result['precio'],
                        cantidad=result['cantidad'],
                        proveedor=result['proveedor'],
                        codigoBarra=result['codigo_barra'],
                    )
        except Exception as error:
            print(f"Error en get: {error}")
        return None

    async def create(self, articulo: Articulo) -> Articulo | None:
        """
        Crear un nuevo artículo.
        """
        try:
            with self.connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    INSERT INTO web_articulos_de_oficina (nombre, tipo, marca, precio, cantidad, proveedor, codigo_barra)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        articulo.nombre,
                        articulo.tipo,
                        articulo.marca,
                        articulo.precio,
                        articulo.cantidad,
                        articulo.proveedor,
                        articulo.codigoBarra,
                    )
                )
                self.connection.commit()
                cursor.execute("SELECT LAST_INSERT_ID() AS idArticulo")
                result = cursor.fetchone()
                if result:
                    return await self.get(result['idArticulo'])
        except Exception as error:
            print(f"Error en create: {error}")
        return None

    async def update(self, idArticulo: int, articulo: Articulo) -> Articulo | None:
        """
        Actualizar un artículo existente.
        """
        try:
            with self.connection.cursor(dictionary=True) as cursor:
                cursor.execute(
                    """
                    UPDATE web_articulos_de_oficina
                    SET nombre = %s, tipo = %s, marca = %s, precio = %s, cantidad = %s, proveedor = %s, codigo_barra = %s
                    WHERE id = %s
                    """,
                    (
                        articulo.nombre,
                        articulo.tipo,
                        articulo.marca,
                        articulo.precio,
                        articulo.cantidad,
                        articulo.proveedor,
                        articulo.codigoBarra,
                        idArticulo,
                    )
                )
                self.connection.commit()
                if cursor.rowcount > 0:
                    return await self.get(idArticulo)
        except Exception as error:
            print(f"Error en update: {error}")
        return None

    async def delete(self, idArticulo: int) -> bool:
        """
        Eliminar un artículo por ID.
        """
        try:
            with self.connection.cursor() as cursor:
                cursor.execute("DELETE FROM web_articulos_de_oficina WHERE id = %s", (idArticulo,))
                self.connection.commit()
                return cursor.rowcount > 0
        except Exception as error:
            print(f"Error en delete: {error}")
        return False

    async def get_all(self) -> list[Articulo]:
        """
        Obtener todos los artículos.
        """
        try:
            articulos = []
            with self.connection.cursor(dictionary=True) as cursor:
                cursor.execute("SELECT * FROM web_articulos_de_oficina")
                result = cursor.fetchall()
                for row in result:
                    articulos.append(
                        Articulo(
                            idArticulo=row['id'],
                            nombre=row['nombre'],
                            tipo=row['tipo'],
                            marca=row['marca'],
                            precio=row['precio'],
                            cantidad=row['cantidad'],
                            proveedor=row['proveedor'],
                            codigoBarra=row['codigo_barra'],
                        )
                    )
            return articulos
        except Exception as error:
            print(f"Error en get_all: {error}")
            return []

