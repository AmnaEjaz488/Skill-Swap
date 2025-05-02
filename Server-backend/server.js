
import dotenv from 'dotenv';
dotenv.config();

import express      from 'express';
import session      from 'express-session';
import cors         from 'cors';
import mongoose     from 'mongoose';
import path         from 'path';
import { google }   from 'googleapis';

import eventsRouter from './routes/api/events.js';

const {
  MONGO_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SERVER_ROOT_URL = 'http://localhost:3001',
  SESSION_SECRET   = 'keyboard_cat_secret',
  PORT             = 3001,
} = process.env;

async function connectDB() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
  });
  console.log('✅ MongoDB connected');
}

const app = express();

// CORS + JSON + Sessions
app.use(
  cors({ origin: 'http://localhost:3000', credentials: true })
);
app.use(express.json());
app.use(
  session({
    secret:            SESSION_SECRET,
    resave:            false,
    saveUninitialized: true,
  })
);

// Google OAuth2 setup
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${SERVER_ROOT_URL}/api/google/callback`
);
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// 1) Start Google sign-in
app.get('/api/google/auth', (_req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt:      'consent',
    scope:       SCOPES,
  });
  res.redirect(url);
});

// 2) OAuth2 callback
app.get('/api/google/callback', async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    req.session.tokens = tokens;
    // back to your React app
    res.redirect('http://localhost:3000/my-calendar');
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).send('Authentication failed');
  }
});

// 3) Mount events API
app.use('/api/events', eventsRouter);

// 4) Expose user’s Google Calendar events
app.get('/api/calendar', async (req, res) => {
  if (!req.session.tokens) return res.status(401).send('Not authenticated');
  try {
    const client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      `${SERVER_ROOT_URL}/api/google/callback`
    );
    client.setCredentials(req.session.tokens);
    const calendar = google.calendar({ version: 'v3', auth: client });
    const { data } = await calendar.events.list({
      calendarId:   'primary',
      timeMin:      new Date().toISOString(),
      singleEvents: true,
      orderBy:      'startTime',
    });
    res.json(data.items);
  } catch (err) {
    console.error('Calendar fetch error:', err);
    res.status(500).send('Error fetching calendar');
  }
});

// 5) (Optional) serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(path.join(path.resolve(), 'client', 'dist'))
  );
  app.get('*', (_req, res) => {
    res.sendFile(
      path.join(path.resolve(), 'client', 'dist', 'index.html')
    );
  });
}

// Boot everything
(async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
  );
})();