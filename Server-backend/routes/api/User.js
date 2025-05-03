import express from 'express';
import User from '../../models/User.js';

const router = express.Router();

// Route to get all users
router.get('/', async (_req, res) => {
  try {
    const users = await User.find().populate('skillOffered').populate('skillNeeded');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Error fetching users');
  }
});

// Route to get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('skillOffered').populate('skillNeeded');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Error fetching user');
  }
});

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Error creating user');
  }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Error updating user');
  }
});

// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Error deleting user');
  }
});

// Route to authenticate a user (login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordCorrect = await user.isCorrectPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).send('Invalid credentials');
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Error logging in user');
  }
});

export default router;