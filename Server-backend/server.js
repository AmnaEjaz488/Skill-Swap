import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import cors from 'cors';

import { typeDefs, resolvers } from './schema/index.js';
import connectDB from './config/connection.js'; // Ensure this points to your connection.js file

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log('Database connected successfully.');

    // Start Apollo Server
    await server.start();
// added cors to fixed fetch error- amna
    app.use(cors({
      origin: 'http://localhost:3000', // Allow requests from this origin
      credentials: true, // Allow cookies and credentials
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server));

    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error.message);
  }
};

startApolloServer();