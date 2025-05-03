import pkg from 'mongoose';
const { Schema, model } = pkg;

const skillNeeded = new Schema(
  {
    skillName: {
      type: String,
      required: true,
      unique: true,
    },
    skillDescription: {
      type: String,
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
export default model('SkillNeeded', skillNeeded);