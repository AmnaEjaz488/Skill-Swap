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



export default skillNeeded;