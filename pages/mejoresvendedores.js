import React, {useEffect} from 'react'
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery, gql } from '@apollo/client';

const MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores{
            vendedor {
                nombre
                email
            }
            total
        }
    }
`;


const MejoresVendedores = () => {
    const {data, loading, error, startPolling, stopPolling} = useQuery(MEJORES_VENDEDORES);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling]) //Consulta sa BD cada segons quan nota que hi ha un canvi. Explicacio practica 146

    if(loading) return 'Cargando..';

    const {mejoresVendedores} = data;

    const vendedorGrafica = [];

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    })

  return (
    <Layout>
        <h1 className='text-2xl font-light text-gray-800'>Mejores Vendedores</h1>
            <ResponsiveContainer
                width={'99%'}
                height={550}
            >
                <BarChart
                    className='mt-10'
                    width={500}
                    height={500}
                    data={vendedorGrafica}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" />

                </BarChart>
            </ResponsiveContainer>
      
    </Layout>
  )
}

export default MejoresVendedores