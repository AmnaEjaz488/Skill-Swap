

// export interface IUser extends Document {
//     name: string;
//     email: string;
//     password: string;
//     phone: string;
//     bio?: string;
//     profilePicture?: string;
//     skillsOffered?: string[];
//     skillsNeeded?: string[];
//     location?: string;
//     availability?: string;
//     experience?: string;
//     education?: string;
//     certifications?: string[];
//     languagesSpoken?: string[];
//     socialMediaLinks?: {
//         [key: string]: string;
//     };

import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// import schema from Book.js
import skillOffered from './SkillOffered.js';
import skillNeeded from './SkillNeeded.js';


const userSchema = new Schema (
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
        required: true,
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
        // availability: {
        //     type: String,
        //     required: false,
        //     },
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

    // set savedBooks to be an array of data that adheres to the bookSchema
    skillOffered: [skillOffered],

    skillNeeded: [skillNeeded],
    },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// userSchema.virtual('bookCount').get(function () {
//   return this.savedBooks.length;
// });

const User = model ('User', userSchema);

export default User;
