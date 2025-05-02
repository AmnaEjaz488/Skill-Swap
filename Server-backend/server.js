
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

const {
  MONGO_URI,
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

// Connect to MongoDB
async function connectDB() {
  if (!MONGO_URI) {
    throw new Error('Missing MONGO_URI in environment');
  }
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB connected');
}

const app = express();

// === Middleware ===
app.use(
  cors({ origin: 'http://localhost:3000', credentials: true })
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
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// React catch-all
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// === Start Server ===
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
  });
