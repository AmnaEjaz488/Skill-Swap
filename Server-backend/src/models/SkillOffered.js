import { Schema, model } from 'mongoose';

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
    daysAvailable: [{
      type: String,
    }],
    bookings: [{
      type: Schema.Types.ObjectId,
      ref: 'Bookings',

    }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },




  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);


// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// userSchema.virtual('bookCount').get(function () {
//   return this.savedBooks.length;
// });



export default skillOffered;
