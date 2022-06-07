import React, {useContext, useState} from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import PedidoContext from '../context/pedidos/PedidoContext';

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const NuevoPedido = () => {
  const router = useRouter();

  const [mensaje, setMensaje] = useState(null);

  //Utilizar context y extrare sus funciones y valores
  const pedidoContext = useContext(PedidoContext);
  const {cliente, productos, total} = pedidoContext;
  

  //Mutation para crear un nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);
  
  const validarPedido = () => {
    return !productos.every( producto => producto.cantidad > 0 ) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : "";

  }
  
  const crearNuevoPedido = async () => {
    const {id} = cliente;
    //Remover lo no deseadod e productos
    const pedido = productos.map(({__typename, existencia, ...producto}) => producto)
    try {
      const {data} = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido
          }  
        }
      });
      router.push('/pedidos');
      Swal.fire(
        'Correcto',
        'El pedido se registro correctamente',
        'success'
      )
    } catch (error) {
      setMensaje(error.message.replace('GraphQL error: ', ''));
      setTimeout(() => {
        setMensaje(null)
      }, 3000)
    }
  }

  const mostrarMensaje = () => {
    return (
      <div className='bg-red-200 border-solid border-2 border-gray-500 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{mensaje}</p>
      </div>
    )
  }
    
  return (
        <Layout>
            <h1 className='text-2xl font-light text-gray-800'>Crear Nuevo Pedido</h1>
            {mensaje && mostrarMensaje()}
            <div className='flex justify-center mt-5'>
              <div className='w-full max-w-lg'>
                <AsignarCliente/>
                <AsignarProductos/>
                <ResumenPedido/>
                <Total/>
                <button
                  type='button'
                  className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
                  onClick={() => crearNuevoPedido()}
                >Registrar Pedido</button>
              </div>
            </div>
            

            

        </Layout>
  )
}

export default NuevoPedido