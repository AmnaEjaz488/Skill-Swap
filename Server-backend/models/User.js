import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    education: {
      type: String,
      required: false,
    },
    certifications: {
      type: [String],
      required: false,
    },
    languagesSpoken: {
      type: [String],
      required: false,
    },
    socialMediaLinks: {
      type: Map,
      of: String,
      required: false,
    },
    // Reference SkillOffered and SkillNeeded models
    skillOffered: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SkillOffered', // Reference the SkillOffered model
      },
    ],
    skillNeeded: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SkillNeeded', // Reference the SkillNeeded model
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Signup method
userSchema.statics.signup = async function (name, email, password) {
  const user = await this.create({ username: name, email, password });
  const token = signToken(user); // Generate a JWT token
  return { token, user }; // Return the token and user data
};

const User = model('User', userSchema);

export default User;
