import React, {useState, useEffect, useContext} from 'react';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos{
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const AsignarProductos = () => {
    const [productos, setProductos] = useState([]);

    const pedidoContext = useContext(PedidoContext);
    const {agregarProducto} = pedidoContext;

    //Consultar la BD
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);


    useEffect(() => {
        agregarProducto(productos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [productos])

    const seleccionarProducto = producto => {
        setProductos(producto)
    }
    //Resultados de la consulta
    if(loading) return null;
    const {obtenerProductos} = data;

  return (
    <>
    <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>2.- Selecciona los productos</p>
      <Select 
          className='mt-2'
          options={obtenerProductos}
          onChange={opcion => seleccionarProducto(opcion)}
          isMulti={true}
          getOptionValue={opciones => opciones.id}
          getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
          placeholder='Seleccione el Producto'
          noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  )
}

export default AsignarProductos