const jwt = require('jsonwebtoken');

const secret = 'yourSecretKey'; // Replace with a secure key
const expiration = '2h';

module.exports = {
  signToken: (user) => {
    const payload = { _id: user._id, email: user.email, username: user.username };
    return jwt.sign(payload, secret, { expiresIn: expiration });
  },
};