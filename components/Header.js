import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
        id
        nombre
        apellido
        }
    }
`;

const Header = () => {
    const router = useRouter();
    //Query Apollo
    const {data, loading, client} = useQuery(OBTENER_USUARIO);
    //Proteger que no accedamos a data antes de tener resultados
    if(loading) {
        return <p>Loading...</p>;
    }
    
    const { nombre } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        client.clearStore();
        router.push('/login');
    }
  return (
      <div className='flex justify-end'>
            <p className='mr-2'>Hola: {nombre}</p>
            <button 
                onClick={() => cerrarSesion()}
                className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
                type='button'
            >
                Cerrar Sesion
            </button>
      </div>
  )
}

export default Header