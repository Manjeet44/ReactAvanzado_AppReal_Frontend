import React, {useContext} from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';

import PedidoContext from '../context/pedidos/PedidoContext';

const NuevoPedido = () => {
  //Utilizar context y extrare sus funciones y valores
  const pedidoContext = useContext(PedidoContext);
  
  
    
  return (
        <Layout>
            <h1 className='text-2xl font-light text-gray-800'>Crear Nuevo Pedido</h1>
            <AsignarCliente/>
            <AsignarProductos/>

            

        </Layout>
  )
}

export default NuevoPedido