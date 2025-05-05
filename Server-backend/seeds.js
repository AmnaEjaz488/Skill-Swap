import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Event from './models/Event.js';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser:    true,
      useUnifiedTopology: true,
    });
    console.log('🔌 Connected to MongoDB');

    // 1) Remove any old seeded docs
    const del = await Event.deleteMany({ seeded: true });
    console.log(`🗑  Deleted ${del.deletedCount} previously seeded events`);

    // 2) Insert fresh seeds
    const seeds = [
      {
        summary:     'Intro to Guitar',
        description: 'Learn basic chords and strumming patterns.',
        start:       new Date('2025-05-05T18:00:00'),
        end:         new Date('2025-05-05T19:00:00'),
        zoomLink:    'https://zoom.us/j/1234567890',
        seeded:      true,
      },
      {
        summary:     'JavaScript Crash Course',
        description: 'DOM, ES6+, and building interactive pages.',
        start:       new Date('2025-05-06T17:00:00'),
        end:         new Date('2025-05-06T19:00:00'),
        zoomLink:    'https://zoom.us/j/2345678901',
        seeded:      true,
      },
      {
        summary:     'Yoga for Beginners',
        description: 'Gentle flow to loosen up after your day.',
        start:       new Date('2025-05-07T07:00:00'),
        end:         new Date('2025-05-07T08:00:00'),
        zoomLink:    'https://zoom.us/j/3456789012',
        seeded:      true,
      },
      {
        summary:     'Spanish Conversation Practice',
        description: 'Practice everyday phrases and small talk.',
        start:       new Date('2025-05-08T20:00:00'),
        end:         new Date('2025-05-08T21:00:00'),
        zoomLink:    'https://zoom.us/j/4567890123',
        seeded:      true,
      },
    ];

    const inserted = await Event.insertMany(seeds);
    console.log(`✅ Inserted ${inserted.length} seeded events`);
    process.exit(1);
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    process.exit();
  }
}

seed();