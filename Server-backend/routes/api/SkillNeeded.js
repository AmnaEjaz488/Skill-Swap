import express from 'express';

const router = express.Router();

// Mock data for demonstration (replace with database queries or actual data)
const skillsNeeded = [
  { id: 1, skillName: 'Web Development', description: 'Looking for help with React.' },
  { id: 2, skillName: 'Graphic Design', description: 'Need assistance with logo design.' },
];

// Route to get all skills needed
router.get('/', async (_req, res) => {
  try {
    res.json(skillsNeeded); // Replace with database query if needed
  } catch (err) {
    console.error('Error fetching skills needed:', err);
    res.status(500).send('Error fetching skills needed');
  }
});

export default router;