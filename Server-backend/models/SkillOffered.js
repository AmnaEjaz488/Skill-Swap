import pkg from 'mongoose';
const { Schema, model } = pkg;

const skillOffered = new Schema(
  {
    skillName: {
      type: String,
      required: true,
      unique: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    skillLevel: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    hoursAvailable: {
      type: Number,
      required: true,
    },
    daysAvailable: [
      {
        type: String,
      },
    ],
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bookings',
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the Mongoose model
export default model('SkillOffered', skillOffered);