import { Schema, model } from 'mongoose';

const skillNeededSchema = new Schema(
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
        ref: 'Booking', // Ensure this matches the actual model name
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

const SkillNeeded = model('SkillNeeded', skillNeededSchema);
export default SkillNeeded;
