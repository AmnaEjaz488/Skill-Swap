const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const User = require('./models/User');
const SkillOffered = require('../models/SkillOffered');
const SkillNeeded = require('../models/SkillNeeded');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id)
          .populate('skillsOffered')
          .populate('skillsNeeded');
      }
      throw new AuthenticationError('You must be logged in');
    },
    skillsOffered: async () => {
      return SkillOffered.find().populate('userId');
    },
    skillsNeeded: async () => {
      return SkillNeeded.find().populate('userId');
    },
    bookings: async (parent, args, context) => {
      if (context.user) {
        return Booking.find({ userId: context.user._id });
      }
      throw new AuthenticationError('You must be logged in');
    },
  },

  Mutation: {
    signup: async (_, { name, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
      } catch (err) {
        throw new Error('Error creating user: ' + err.message);
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid email or password');
      }
      const token = signToken(user);
      return { token, user };
    },
    addSkillOffered: async (_, args, context) => {
      if (context.user) {
        const skill = await SkillOffered.create({ ...args, userId: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { skillsOffered: skill._id } });
        return skill;
      }
      throw new AuthenticationError('You must be logged in');
    },
    addSkillNeeded: async (_, args, context) => {
      if (context.user) {
        const skill = await SkillNeeded.create({ ...args, userId: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { skillsNeeded: skill._id } });
        return skill;
      }
      throw new AuthenticationError('You must be logged in');
    },
    deleteSkillOffered: async (_, { skillId }, context) => {
      if (context.user) {
        const skill = await SkillOffered.findByIdAndDelete(skillId);
        await User.findByIdAndUpdate(context.user._id, { $pull: { skillsOffered: skillId } });
        return skill;
      }
      throw new AuthenticationError('You must be logged in');
    },
    deleteSkillNeeded: async (_, { skillId }, context) => {
      if (context.user) {
        const skill = await SkillNeeded.findByIdAndDelete(skillId);
        await User.findByIdAndUpdate(context.user._id, { $pull: { skillsNeeded: skillId } });
        return skill;
      }
      throw new AuthenticationError('You must be logged in');
    },
    requestSession: async (_, { skillId, date }, context) => {
      if (context.user) {
        return Booking.create({ userId: context.user._id, skillId, date });
      }
      throw new AuthenticationError('You must be logged in');
    },
  },
};

module.exports = resolvers;
