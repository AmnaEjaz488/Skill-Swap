import { Schema, model } from 'mongoose';

const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

const bookings = new Schema({
    tutorID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
    ,
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  
    DateTime: {
      type: Date,
      required: true,
      get: (date) => formatDate(date)
    },  

    goalsForSession: {
      type: String,
      required: true,
    },
   
    Feedback: [{
      type: String,
    }],




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


const Bookings = model('Bookings', bookings);
export default Bookings;
