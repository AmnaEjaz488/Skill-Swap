import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import eventsRouter from './routes/api/events.js';
import calendarRouter from './routes/api/calendar.js';
import jwt from 'jsonwebtoken';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';

const {
  MONGODB_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URL = 'http://localhost:3001',
  SESSION_SECRET = 'keyboard_cat_secret',
  PORT = 3001,
  NODE_ENV,
  JWT_SECRET_KEY,
} = process.env;

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in environment');
  }
  await mongoose.connect(MONGODB_URI);
  console.log('✅ MongoDB connected');
}

console.log('MONGODB:', process.env.MONGODB_URI);

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection
  context: ({ req }) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    console.log('Received Token:', token); // Log the token
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
        console.log('Verified User:', user); // Log the verified user
        return { user }; // Attach the user to the context
      } catch (err) {
        console.error('Invalid token:', err.message);
      }
    }
    return {}; // Return an empty context if no token is provided or verification fails
  },
});

const startApolloServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log('Database connected successfully.');

    // Start Apollo Server
    await server.start();

    // Added CORS to fix fetch error
    app.use(cors({
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'], // Allow requests from Apollo Sandbox
      credentials: true, // Allow cookies and credentials
    }));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //graphql 
    app.use('/graphql', expressMiddleware(server));

    // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../Client/build')));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../Client/build/index.html'));
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

// === Middleware ===
app.use(
  cors({ origin: ['http://localhost:3000', 'https://studio.apollographql.com'], credentials: true })
);
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

// === Static File Serving ===
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Client/build')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../Client/build/index.html'));
  });
}
