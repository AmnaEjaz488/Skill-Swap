import { Schema, model } from 'mongoose';
import dayjs from 'dayjs'; // Use ES module syntax for dayjs

// Helper function to format dates
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

// Define the schema for bookings
const bookings = new Schema(
  {
    tutorID: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
      required: true,
    },
    DateTime: {
      type: Date,
      required: true,
      get: (date) => formatDate(date), // Use the helper function to format dates
    },
    goalsForSession: {
      type: String,
      required: true,
    },
    Feedback: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Enable virtuals in JSON output
      getters: true, // Enable getters (e.g., for formatted dates)
    },
  }
);

// Create and export the Bookings model
const Bookings = model('Bookings', bookings);
export default Bookings;
