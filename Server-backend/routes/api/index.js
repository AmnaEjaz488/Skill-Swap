import express from 'express';
import userRoutes from './User.js';
import skillOfferedRoutes from './SkillOffered.js';
import skillNeededRoutes from './SkillNeeded.js';
import eventsRouter from './events.js';
import calendarRouter from './calendar.js';
import protectedRoutes from './protected.js';

const router = express.Router();

// Combine all API routes
router.use('/users', userRoutes);
router.use('/skills/offered', skillOfferedRoutes);
router.use('/skills/needed', skillNeededRoutes);
router.use('/events', eventsRouter);
router.use('/calendar', calendarRouter);
router.use('/', protectedRoutes);

export default router;