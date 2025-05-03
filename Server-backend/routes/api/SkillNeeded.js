import express from 'express';
import SkillNeeded from '../../models/SkillNeeded.js';

const router = express.Router();

// Route to get all skills needed
router.get('/', async (_req, res) => {
  try {
    const skillsNeeded = await SkillNeeded.find().populate('bookings').populate('userId');
    res.json(skillsNeeded);
  } catch (err) {
    console.error('Error fetching skills needed:', err);
    res.status(500).send('Error fetching skills needed');
  }
});

// Route to get a single skill needed by ID
router.get('/:id', async (req, res) => {
  try {
    const skillNeeded = await SkillNeeded.findById(req.params.id).populate('bookings').populate('userId');
    if (!skillNeeded) {
      return res.status(404).send('Skill not found');
    }
    res.json(skillNeeded);
  } catch (err) {
    console.error('Error fetching skill needed:', err);
    res.status(500).send('Error fetching skill needed');
  }
});

// Route to create a new skill needed
router.post('/', async (req, res) => {
  try {
    const newSkillNeeded = await SkillNeeded.create(req.body);
    res.status(201).json(newSkillNeeded);
  } catch (err) {
    console.error('Error creating skill needed:', err);
    res.status(500).send('Error creating skill needed');
  }
});

// Route to update a skill needed by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSkillNeeded = await SkillNeeded.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSkillNeeded) {
      return res.status(404).send('Skill not found');
    }
    res.json(updatedSkillNeeded);
  } catch (err) {
    console.error('Error updating skill needed:', err);
    res.status(500).send('Error updating skill needed');
  }
});

// Route to delete a skill needed by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSkillNeeded = await SkillNeeded.findByIdAndDelete(req.params.id);
    if (!deletedSkillNeeded) {
      return res.status(404).send('Skill not found');
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    console.error('Error deleting skill needed:', err);
    res.status(500).send('Error deleting skill needed');
  }
});

export default router;