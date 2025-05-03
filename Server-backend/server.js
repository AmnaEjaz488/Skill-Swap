import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Ensure the path is correct
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import eventsRouter from './routes/api/events.js';
import calendarRouter from './routes/api/calendar.js';
import skillNeededRoutes from './routes/api/SkillNeeded.js'; // Corrected path
import skillOfferedRoutes from './routes/api/SkillOffered.js';
import protectedRoutes from './routes/api/protected.js';
import userRoutes from './routes/api/User.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Extract environment variables
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URL = 'http://localhost:3001',
  SESSION_SECRET = 'keyboard_cat_secret',
  PORT = 3001,
  NODE_ENV,
} = process.env;

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === MongoDB Connection ===
const MONGODB_URI = 'mongodb://localhost:27017/skillswapDB'; // Replace with your URI
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  });

// === GraphQL Type Definitions and Resolvers ===
const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();

  const app = express();

  // Middleware
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use(express.json());
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

  // === Google OAuth2 Setup ===
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `${SERVER_ROOT_URL}/api/google/callback`
  );
  const SCOPES = ['https://www.googleapis.com/auth/calendar'];

  // Start OAuth flow
  app.get('/api/google/auth', (_req, res) => {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: SCOPES,
    });
    res.redirect(url);
  });

  // OAuth callback
  app.get('/api/google/callback', async (req, res) => {
    try {
      const { tokens } = await oauth2Client.getToken(req.query.code);
      req.session.tokens = tokens;
      res.redirect('http://localhost:3000/my-calendar');
    } catch (err) {
      console.error('OAuth callback error:', err);
      res.status(500).send('Authentication failed');
    }
  });

  // === API Routes ===
  app.use('/api/events', eventsRouter);
  app.use('/api/calendar', calendarRouter);
  app.use('/api/skills/needed', skillNeededRoutes); // Corrected path
  app.use('/api/skills/offered', skillOfferedRoutes); // Corrected path
  app.use('/api', protectedRoutes);
  app.use('/api/users', userRoutes);

  // === Apollo Middleware ===
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Add authentication or other context logic here
        return { user: req.user || null };
      },
    })
  );

  // === Static File Serving ===
  if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // === Start Server ===
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint available at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();