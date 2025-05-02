import express from 'express';
import Event from '../../models/Event.js';
import { google } from 'googleapis';

const router = express.Router();

// 1) List all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort('start');
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching events');
  }
});

// 2) Create a new event
router.post('/', async (req, res) => {
  try {
    const { summary, description, start, end, zoomLink } = req.body;
    const ev = await Event.create({
      summary,
      description,
      start:   new Date(start),
      end:     new Date(end),
      zoomLink,
    });
    res.status(201).json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating event');
  }
});

// 3) Enroll in an event (adds to Google Calendar)
router.post('/:id/enroll', async (req, res) => {
  if (!req.session.tokens) return res.status(401).send('Not authenticated');
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.SERVER_ROOT_URL}/api/google/callback`
    );
    oauth2Client.setCredentials(req.session.tokens);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const ev = await Event.findById(req.params.id);
    const gEvent = {
      summary:     ev.summary,
      description: `${ev.description}\nZoom: ${ev.zoomLink}`,
      start:       { dateTime: ev.start.toISOString() },
      end:         { dateTime: ev.end.toISOString() },
    };

    const { data } = await calendar.events.insert({
      calendarId: 'primary',
      resource:   gEvent,
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error enrolling in event');
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).send('Event not found');
    if (ev.seeded) return res.status(403).send('Cannot delete seeded events');
    await ev.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(500).send('Error deleting event');
  }
});


export default router;