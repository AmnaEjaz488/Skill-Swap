import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { typeDefs, resolvers } from './schema/index.js';
import connectDB from './config/db.js';  // Adjusted for import


dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3001;
const app = express();

// Enable CORS
app.use(cors());

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        return { user }; // Attach the user to the context
      } catch (err) {
        console.error('Invalid token:', err.message);
      }
    }
    return {}; // Return an empty context if no valid token is provided
  },
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Middleware for Apollo Server
  app.use('/graphql', expressMiddleware(server));

  // Serve static assets in production
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  connectDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
});

startApolloServer();
