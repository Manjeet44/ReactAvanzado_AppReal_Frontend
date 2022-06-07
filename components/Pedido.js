import React, {useState, useEffect} from 'react'

const Pedido = ({pedido}) => {
    const {id, total, cliente, estado} = pedido;
    const [estadoPedido, setEstadoPedido] = useState(estado);
    useEffect(() => {
        if(estadoPedido) {
            setEstadoPedido(estadoPedido);
        }
    }, [estadoPedido])
  return (
    <div className='mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg'>
        <div>
            <p className='font-bold text-gray-800'>Cliente: {cliente}</p>
            <h2 className='text-gray-800 font-bold mt-10'>Estado Pedido:</h2>
            <select
                className='mt-2 appearance-none bg-blue-600 border boder-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold'
                value={estadoPedido}
            >
                <option value='COMPLETADO'>COMPLETADO</option>
                <option value='PENDIENTE'>PENDIENTE</option>
                <option value='CANCELADO'>CANCELADO</option>
            </select>
        </div>

        <div>
            <h2 className='text-gray-800 font-bold mt-2'>Resumen del Pedido</h2>
            {pedido.pedido.map(articulo => (
                <div key={articulo.id} className='mt-4'>
                    <p className='text-sm text-gray-600'>Producto: {articulo.nombre}</p>
                    <p className='text-sm text-gray-600'>Cantidad: {articulo.cantidad}</p>
                </div>
            ))}
            <p className='text-gray-800 mt-3 font-bold'>Total a pagar: <span className='font-light'> {total} €</span></p>

            <button
                className='uppercase text-xs font-bold flex items-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight'
            >
                Eliminar Pedido
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Pedido