import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'https://crmredux.herokuapp.com/',
    fetch: fetch
});

const authLink = setContext((_, {headers}) => {
    //Leer el storage almacenado
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;