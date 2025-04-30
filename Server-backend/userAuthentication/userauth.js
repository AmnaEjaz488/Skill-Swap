import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET; // Load secret from .env

export const signToken = (user) => {
  const payload = { _id: user._id, email: user.email, name: user.name };
  return jwt.sign(payload, secret); // No expiration set
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error('Invalid token:', err.message);
    return null;
  }
};