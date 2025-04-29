const { AuthenticationError } = require('apollo-server-express');
const { User, Skill, Booking } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('skillsOffered skillsWanted');
      }
      throw new AuthenticationError('You must be logged in');
    },
    skills: async (parent, { category }) => {
      const query = category ? { category } : {};
      return Skill.find(query).populate('createdBy');
    },
    bookings: async (parent, args, context) => {
      if (context.user) {
        return Booking.find({ userId: context.user._id }).populate('skillId');
      }
      throw new AuthenticationError('You must be logged in');
    }
  },

  Mutation: {
    signup: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addSkill: async (parent, args, context) => {
      if (context.user) {
        const skill = await Skill.create({ ...args, createdBy: context.user._id });
        await User.findByIdAndUpdate(context.user._id, { $push: { skillsOffered: skill._id } });
        return skill;
      }
      throw new AuthenticationError('You must be logged in');
    },
    editSkill: async (parent, { skillId, ...updates }, context) => {
      if (context.user) {
        return Skill.findByIdAndUpdate(skillId, updates, { new: true });
      }
      throw new AuthenticationError('You must be logged in');
    },
    deleteSkill: async (parent, { skillId }, context) => {
      if (context.user) {
        const skill = await Skill.findByIdAndDelete(skillId);
        await User.findByIdAndUpdate(context.user._id, { $pull: { skillsOffered: skillId } });
        return skill;
      }
      throw new AuthenticationError('You must be logged in');
    },
    requestSession: async (parent, { skillId, date }, context) => {
      if (context.user) {
        return Booking.create({ userId: context.user._id, skillId, date });
      }
      throw new AuthenticationError('You must be logged in');
    }
  }
};

module.exports = resolvers;
