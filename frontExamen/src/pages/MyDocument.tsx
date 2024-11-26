import React, { useEffect , useState} from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { apiService } from '../services/apiServices';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

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

// Create Document Component
export const MyDocument = () => {
    const [articulos, setArticulos] = useState<Articulos[]>([]);

    useEffect(() => {
        apiService.get('articulos').then((data) => {
          console.log(data);
            setArticulos(data);
        });
    },[]);

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
 {articulos.map((articulo) => (
  <View key={articulo.idArticulo}>
      <View style={styles.section}>
          <Text>{articulo.idArticulo}</Text>
      </View>
      <View>
          <Text>{articulo.nombre}</Text>
          <Text>{articulo.tipo}</Text>
          <Text>{articulo.marca}</Text>
          <Text>{articulo.precio}</Text>
          <Text>{articulo.cantidad}</Text>
          <Text>{articulo.proveedor}</Text>
          <Text>{articulo.codigoBarra}</Text>
      </View>
  </View>
 ))}
          </View>
          
        </Page>
      </Document>
    );
};  