const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET;

const signToken = (user) => {
  const payload = { _id: user._id, email: user.email, username: user.username };
  return jwt.sign(payload, secret, { expiresIn: '2h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error('Invalid token:', err.message);
    return null;
  }
};

module.exports = {
  signToken,
  verifyToken,
};