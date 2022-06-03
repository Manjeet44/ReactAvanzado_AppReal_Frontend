import React from 'react';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';

const  ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`;

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

const Producto = ({producto}) => {
    const {nombre, precio, existencia, id} = producto;

    //Mutation para elimnar productos
    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache) {
            const { obtenerProductos } = cache.readQuery({
                query: OBTENER_PRODUCTOS,
            });

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter( prodcutoActual => prodcutoActual.id !== id)
                }
            })
        }
    });

    const confirmarEliminarProducto= () => {
        Swal.fire({
            title: 'Deseas eliminar este Producto?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //Eliminar producto de la bd
                    const {data} = await eliminarProducto({
                        variables: {
                            id
                        }
                    })
                    //console.log(data)
                    Swal.fire(
                        'Correcto',
                        data.eliminarProducto,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }
                
              
            }
          })
    }
    return (
        <tr>
            <td className='border px-4 py-2'>{nombre}</td>
            <td className='border px-4 py-2'>{existencia} Unidades</td>
            <td className='border px-4 py-2'>{precio} €</td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-red-800 hover:bg-red-900 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => confirmarEliminarProducto()}
                >
                    Eliminar
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-green-600 hover:bg-green-900 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => editarCliente()}
                >
                    Editar
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}

export default Producto