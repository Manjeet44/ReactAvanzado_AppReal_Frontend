import React, {useState, useEffect, useContext} from 'react';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const AsignarCliente = () => {
    const [cliente, setCliente] = useState([]);

    const pedidoContext = useContext(PedidoContext);
    const {agregarCliente} = pedidoContext;

    //Consultar la BD
    const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO);


    useEffect(() => {
        agregarCliente(cliente);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cliente])

    const seleccionarCliente = clientes => {
        setCliente(clientes)
    }
    //Resultados de la consulta
    if(loading) return null;

    const { obtenerClientesVendedor} = data;
  return (
    <>
    <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'>1.- Asigna un Cliente al Pedido</p>
      <Select 
          className='mt-2'
          options={obtenerClientesVendedor}
          onChange={opcion => seleccionarCliente(opcion)}
          getOptionValue={opciones => opciones.id}
          getOptionLabel={opciones => opciones.nombre}
          placeholder='Seleccione el Cliente'
          noOptionsMessage={() => 'No hay resultados'}
      />
    </>
  )
}

export default AsignarCliente