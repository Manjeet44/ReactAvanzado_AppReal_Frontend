import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';

const OBTENER_CLIENTE = gql`
    query obtenerCliente($id:ID!) {
        obtenerCliente(id:$id) {
            nombre
            apellido
            email
            telefono
            empresa
        }
    }
`;


const EditarCliente = () => {
    //obtener el id actual
    const router = useRouter();
    const { query:  {pid: id }} = router;
    

    //Consultar para obtener el cliente
    const { data, loading, error} = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    });
    

    //Schema de validacion
    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido: Yup.string().required('El apellido es obligatorio'),
        empresa: Yup.string().required('El campo empresa es obligatorio'),
        email: Yup.string().email('Email no valido').required('El Email es obligatorio')
    });

    if(loading) return 'Cargando...';
    if (error) return `Error! ${error.message}`;
    


    const {obtenerCliente} = data;

  return (
      <Layout>
        <h1 className='text-2xl text-gray-800 font-light'>Editar cliente</h1>
        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-lg'>
            <Formik
                validationSchema={schemaValidacion}
                enableReinitialize
                initialValues={obtenerCliente}
                onSubmit={() => {
                    console.log('Enviando')
                }}
            >
                {props => {

                    return (
                        <form
                            className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                            onSubmit={props.handleSubmit}
                        >
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                                Nombre
                            </label>
                            <input
                                id='nombre'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='text'
                                placeholder='Nombre Cliente'
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.nombre}
                            />
                        </div>

                        {props.touched.nombre && props.errors.nombre ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p>{props.errors.nombre}</p>
                                        </div>
                        ) : null}
                        
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                                Apellido
                            </label>
                            <input
                                id='apellido'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='text'
                                placeholder='Apellido Cliente'
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.apellido}
                            />
                        </div>

                        {props.touched.apellido && props.errors.apellido ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p>{props.errors.apellido}</p>
                                        </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
                                Empresa
                            </label>
                            <input
                                id='empresa'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='text'
                                placeholder='Empresa Cliente'
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.empresa}
                            />
                        </div>

                        {props.touched.empresa && props.errors.empresa ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p>{props.errors.empresa}</p>
                                        </div>
                                ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                Email
                            </label>
                            <input
                                id='email'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='email'
                                placeholder='Email Cliente'
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                            />
                        </div>

                        {props.touched.email && props.errors.email ? (
                                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                            <p>{props.errors.email}</p>
                                        </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                                Telefono
                            </label>
                            <input
                                id='telefono'
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='tel'
                                placeholder='Telefono Cliente'
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.telefono}
                            />
                        </div>

                        <input 
                            type='submit'
                            className='bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer'
                            value='Editar Cliente'
                        />

                        </form>
                    )
                }}
            </Formik>
          </div>
        </div>

      </Layout>
  )
}

export default EditarCliente