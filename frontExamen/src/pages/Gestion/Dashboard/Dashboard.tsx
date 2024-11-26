import { Mainlayout } from '../../../templates/mainLayout'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { apiService } from '../../../services/apiServices'
import { useEffect,useState } from 'react'
import { Button } from '../../../components'
import { DialogArt } from '../../../components/dialogEdit/DialogArt'
interface Articulos {
  idArticulo: number,
  nombre:string,
  tipo:string,
  marca:string,
  precio: string,
  cantidad:string,
  proveedor:string,
  codigoBarra:string,
}

import { Create } from '../../Create'

const Dashboard = () => {

  const [articulos, setArticulos] = useState<Articulos[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchMateriales = () => {
    apiService.get('articulos').then((data) => {
      console.log(data);
      setArticulos(data);
    }
    );
  }

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetchMateriales();
    }
  }, [loading]);


  console.log(articulos);

  return (
    <Mainlayout>
      <DialogArt 
            idArticulo={0}
            nombre={""}
            tipo={""}
            marca={""}
            precio={""}
            cantidad={""}
            proveedor={""}
            codigoBarra={""}
            fetchArticulos={fetchMateriales}
            isCreate={true}
          />
          <Button className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg shadow-sm ml-5 mr-5" onClick={() => <Create />} >
            Crear Reporte
          </Button>
<Table className="w-full text-sm text-left border-collapse border border-gray-200 bg-indigo-50 shadow-md rounded-lg">
  <TableHeader className="bg-indigo-200 text-indigo-900 font-semibold">
    <TableRow>
      <TableHead className="px-4 py-2 border-b border-gray-300">Nombre</TableHead>
      <TableHead className="px-4 py-2 border-b border-gray-300">Tipo</TableHead>
      <TableHead className="px-4 py-2 border-b border-gray-300">Precio</TableHead>
      <TableHead className="px-4 py-2  border-b border-gray-300">Cantidad</TableHead>
      <TableHead className="px-4 py-2  border-b border-gray-300">Proveedor</TableHead>
      <TableHead className="px-4 py-2  border-b border-gray-300">Código de Barra</TableHead>
      <TableHead className="px-4 py-2  border-b border-gray-300">Acciones</TableHead>	
    </TableRow>
  </TableHeader>
  <TableBody>
    {articulos.map((articulo) => (
      <TableRow 
        key={articulo.idArticulo} 
        className="hover:bg-indigo-100 transition duration-200"
      >
        <TableCell className="px-4 py-2 border-b border-gray-300">{articulo.nombre}</TableCell>
        <TableCell className="px-4 py-2 border-b border-gray-300">{articulo.tipo}</TableCell>
        <TableCell className="px-4 py-2 border-b border-gray-300">{articulo.precio}</TableCell>
        <TableCell className="px-4 py-2 border-b border-gray-300">{articulo.cantidad}</TableCell>
        <TableCell className="px-4 py-2 border-b border-gray-300">{articulo.proveedor}</TableCell>
        <TableCell className="px-4 py-2 text-right border-b border-gray-300">{articulo.codigoBarra}</TableCell>
        <TableCell className="px-4 py-2 text-right border-b border-gray-300">
          <DialogArt 
            idArticulo={articulo.idArticulo}
            nombre={articulo.nombre}
            tipo={articulo.tipo}
            marca={articulo.marca}
            precio={articulo.precio}
            cantidad={articulo.cantidad}
            proveedor={articulo.proveedor}
            codigoBarra={articulo.codigoBarra}
            fetchArticulos={fetchMateriales}
            isCreate={false}
          />
          <Button className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg shadow-sm ml-5 mr-5"
            onClick={() => {
              apiService.delete(`articulos/${articulo.idArticulo}`).then(() => {
                fetchMateriales();
              });
            
          }}

          >Eliminar</Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

    </Mainlayout>
  )
}

export default Dashboard
