import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://skill-swa3-backend.onrender.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Return the headers with the Authorization token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;