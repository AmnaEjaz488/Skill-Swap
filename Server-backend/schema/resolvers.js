import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import SkillOffered from '../models/SkillOffered.js';
import SkillNeeded from '../models/SkillNeeded.js';
import Booking from '../models/Booking.js';

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      return await User.findById(user._id);
    },
    skillsOffered: async () => await SkillOffered.find(),
    skillsNeeded: async () => await SkillNeeded.find(),
    bookings: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      return await Booking.find({ userId: user._id });
    },
  },
  Mutation: {
    signup: async (_, { name, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AuthenticationError('Invalid email or password');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },
    addSkillOffered: async (_, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      const skill = await SkillOffered.create({ ...args, userId: user._id });
      await User.findByIdAndUpdate(user._id, { $push: { skillsOffered: skill._id } });
      return skill;
    },
    addSkillNeeded: async (_, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      const skill = await SkillNeeded.create({ ...args, userId: user._id });
      await User.findByIdAndUpdate(user._id, { $push: { skillsNeeded: skill._id } });
      return skill;
    },
    deleteSkillOffered: async (_, { skillId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      const skill = await SkillOffered.findByIdAndDelete(skillId);
      await User.findByIdAndUpdate(user._id, { $pull: { skillsOffered: skillId } });
      return skill;
    },
    deleteSkillNeeded: async (_, { skillId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      const skill = await SkillNeeded.findByIdAndDelete(skillId);
      await User.findByIdAndUpdate(user._id, { $pull: { skillsNeeded: skillId } });
      return skill;
    },
    requestSession: async (_, { skillId, date }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      return await Booking.create({ userId: user._id, skillId, date });
    },
  },
};

export default resolvers;