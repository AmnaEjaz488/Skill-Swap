import express from 'express';
import { google } from 'googleapis';

const router = express.Router();

function getCalendarClient(req) {
  const o = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.SERVER_ROOT_URL}/api/google/callback`
  );
  o.setCredentials(req.session.tokens);
  return google.calendar({ version: 'v3', auth: o });
}

// List events
router.get('/', async (req, res) => {
  if (!req.session.tokens) return res.status(401).send('Not authenticated');
  try {
    const calendar = getCalendarClient(req);
    const { data } = await calendar.events.list({
      calendarId:   'primary',
      timeMin:      new Date().toISOString(),
      singleEvents: true,
      orderBy:      'startTime',
    });
    res.json(data.items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching calendar');
  }
});

// Delete/unenroll
router.delete('/:id', async (req, res) => {
  if (!req.session.tokens) return res.status(401).send('Not authenticated');
  try {
    const calendar = getCalendarClient(req);
    await calendar.events.delete({
      calendarId: 'primary',
      eventId:    req.params.id,
    });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error unenrolling from event');
  }
});

export default router;