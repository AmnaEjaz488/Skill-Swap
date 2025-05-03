import express from 'express';

const router = express.Router();

// Mock data for demonstration (replace with database queries or actual data)
const skillsOffered = [
  { id: 1, skillName: 'Piano Lessons', experience: '5 years', level: 'Expert' },
  { id: 2, skillName: 'Cooking', experience: '3 years', level: 'Intermediate' },
];

// Route to get all skills offered
router.get('/', async (_req, res) => {
  try {
    res.json(skillsOffered); // Replace with database query if needed
  } catch (err) {
    console.error('Error fetching skills offered:', err);
    res.status(500).send('Error fetching skills offered');
  }
});

export default router;