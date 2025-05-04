import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();



export const authenticateToken = (req) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2h' });
    req.user = data;
  } catch (err) {
    console.log('Invalid token');
  }

  return req;
};

export const signToken = (username, email, _id) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY; // Use JWT_SECRET instead of JWT_SECRET_KEY

  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};