const { User, SkillOffered, SkillNeeded, Booking } = require('../models');
const { signToken } = require('../utils/auth');

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
    }
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
    requestSession: async (parent, { skillId, date }, context) => {
      if (context.user) {
        return Booking.create({ userId: context.user._id, skillId, date });
      }
      throw new AuthenticationError('You must be logged in');
    }
  }
};

module.exports = resolvers;
