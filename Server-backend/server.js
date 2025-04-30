import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
<<<<<<< HEAD:Server-backend/server.js
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Adjust the path if necessary

import { typeDefs, resolvers } from './schema/index.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 3001;
const app = express();

=======

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

const PORT = process.env.PORT || 3001;
const app = express();
>>>>>>> f2fdd44e5815ad372853fa4666366d63adf32d59:Server-backend/src/server.js
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
<<<<<<< HEAD:Server-backend/server.js

=======
  
>>>>>>> f2fdd44e5815ad372853fa4666366d63adf32d59:Server-backend/src/server.js
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

<<<<<<< HEAD:Server-backend/server.js
=======
  // if we're in production, serve client/dist as static assets
>>>>>>> f2fdd44e5815ad372853fa4666366d63adf32d59:Server-backend/src/server.js
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
<<<<<<< HEAD:Server-backend/server.js
  // Connect to MongoDB
  await connectDB();
=======
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
>>>>>>> f2fdd44e5815ad372853fa4666366d63adf32d59:Server-backend/src/server.js

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
<<<<<<< HEAD:Server-backend/server.js
=======

>>>>>>> f2fdd44e5815ad372853fa4666366d63adf32d59:Server-backend/src/server.js
