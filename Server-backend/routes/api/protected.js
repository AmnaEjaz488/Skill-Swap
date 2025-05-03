import express from 'express';
import { authenticateToken } from '../../utils/auth.js'; // Adjusted path

const router = express.Router();

// Define a protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;