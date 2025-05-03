import express from 'express';
import SkillOffered from '../../models/SkillOffered.js';

const router = express.Router();

// Route to get all skills offered
router.get('/', async (_req, res) => {
  try {
    const skillsOffered = await SkillOffered.find().populate('bookings').populate('userId');
    res.json(skillsOffered);
  } catch (err) {
    console.error('Error fetching skills offered:', err);
    res.status(500).send('Error fetching skills offered');
  }
});

// Route to get a single skill offered by ID
router.get('/:id', async (req, res) => {
  try {
    const skillOffered = await SkillOffered.findById(req.params.id).populate('bookings').populate('userId');
    if (!skillOffered) {
      return res.status(404).send('Skill not found');
    }
    res.json(skillOffered);
  } catch (err) {
    console.error('Error fetching skill offered:', err);
    res.status(500).send('Error fetching skill offered');
  }
});

// Route to create a new skill offered
router.post('/', async (req, res) => {
  try {
    const newSkillOffered = await SkillOffered.create(req.body);
    res.status(201).json(newSkillOffered);
  } catch (err) {
    console.error('Error creating skill offered:', err);
    res.status(500).send('Error creating skill offered');
  }
});

// Route to update a skill offered by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSkillOffered = await SkillOffered.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSkillOffered) {
      return res.status(404).send('Skill not found');
    }
    res.json(updatedSkillOffered);
  } catch (err) {
    console.error('Error updating skill offered:', err);
    res.status(500).send('Error updating skill offered');
  }
});

// Route to delete a skill offered by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSkillOffered = await SkillOffered.findByIdAndDelete(req.params.id);
    if (!deletedSkillOffered) {
      return res.status(404).send('Skill not found');
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    console.error('Error deleting skill offered:', err);
    res.status(500).send('Error deleting skill offered');
  }
});

export default router;