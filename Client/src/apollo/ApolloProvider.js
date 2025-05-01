import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache(), // this remmeber the data and we dont have to ask clinet again for information
});

const ApolloProvider = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;