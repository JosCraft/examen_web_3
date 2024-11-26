import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, Button, Label } from "../ui";
import {apiService} from "../../services/apiServices"; 

interface Articulos {
  idArticulo: number;
  nombre: string;
  tipo: string;
  marca: string;
  precio: string;
  cantidad: string;
  proveedor: string;
  codigoBarra: string;
  isCreate: boolean;
    fetchArticulos: () => void;
}

export const DialogArt = ({
  idArticulo,
  nombre,
  tipo,
  marca,
  precio,
  cantidad,
  proveedor,
  codigoBarra,
    fetchArticulos,
    isCreate,
}: Articulos) => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    nombre,
    tipo,
    marca,
    precio,
    cantidad,
    proveedor,
    codigoBarra,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateArticulo = () => {
    apiService.update(`articulos`,idArticulo,{
        idArticulo: idArticulo,
        nombre: formData.nombre,
        tipo: formData.tipo,
        marca: formData.marca,
        precio: formData.precio,
        cantidad: formData.cantidad,
        proveedor: formData.proveedor,
        codigoBarra: formData.codigoBarra,
      })
      .then(() => {
        fetchArticulos();

      })
      .catch((error) => {
        console.error("Error actualizando el artículo:", error);
      });
  };
  const CreateArticulo = () => {
    apiService.create(`articulos`,{
        idArticulo: idArticulo,
        nombre: formData.nombre,
        tipo: formData.tipo,
        marca: formData.marca,
        precio: formData.precio,
        cantidad: formData.cantidad,
        proveedor: formData.proveedor,
        codigoBarra: formData.codigoBarra,
      })
      .then(() => {
        fetchArticulos();

      })
      .catch((error) => {
        console.error("Error actualizando el artículo:", error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        {!isCreate ? (
          <Button className="bg-indigo-500 text-white hover:bg-indigo-600">
          Editar Artículo
        </Button>):(
          <Button className="bg-indigo-500 text-white hover:bg-indigo-600">
            Crear Artículo
            </Button>
            )}

      </DialogTrigger>
      <DialogContent className="max-w-lg bg-white p-6 rounded-md shadow-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-700">
            Editar Artículo
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Modifica los campos del artículo y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4 mt-4">
          <div>
            <Label htmlFor="nombre" className="text-sm font-medium text-gray-600">
              Nombre
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="tipo" className="text-sm font-medium text-gray-600">
              Tipo
            </Label>
            <Input
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="marca" className="text-sm font-medium text-gray-600">
              Marca
            </Label>
            <Input
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="precio" className="text-sm font-medium text-gray-600">
              Precio
            </Label>
            <Input
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="cantidad" className="text-sm font-medium text-gray-600">
              Cantidad
            </Label>
            <Input
              id="cantidad"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="proveedor" className="text-sm font-medium text-gray-600">
              Proveedor
            </Label>
            <Input
              id="proveedor"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <Label htmlFor="codigoBarra" className="text-sm font-medium text-gray-600">
              Código de Barra
            </Label>
            <Input
              id="codigoBarra"
              name="codigoBarra"
              value={formData.codigoBarra}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </Button>
            {!isCreate ? (
              <Button
              type="button"
              onClick={updateArticulo}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Guardar Cambios
            </Button>
            ) : (
              <Button
                type="button"
                onClick={CreateArticulo}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Guardar Cambios
                </Button>
                )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
