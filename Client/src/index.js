import React from 'react';
import ReactDOM from 'react-dom/client'

import './styles/index.css';
import App from './App';

import './styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ApolloProvider from './apollo/ApolloProvider'; // Correct path


const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);