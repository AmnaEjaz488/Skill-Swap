// filepath: c:\Users\user\Desktop\bootcamp\skillSwap- project3\Skill-Swap\Server-backend\seeds\seeddb.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js'; // Adjust the path to your User model
import SkillOffered from '../models/SkillOffered.js'; // Adjust the path to your SkillOffered model
import SkillNeeded from '../models/SkillNeeded.js'; // Adjust the path to your SkillNeeded model

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB.');

    // Clear existing data
    await User.deleteMany({});
    await SkillOffered.deleteMany({});
    await SkillNeeded.deleteMany({});
    console.log('🗑️  Cleared User, SkillOffered, and SkillNeeded collections.');

    // Insert seed data
    const users = await User.insertMany([
      {
        name:'user11',
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        phone: '123-456-7890',
        bio: 'I am a web developer with 5 years of experience.',
      },
      {
        name:'user12',
        username: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        phone: '987-654-3210',
        bio: 'I am a graphic designer with 3 years of experience.',
      },
    ]);
    console.log('✅ Seeded User collection.');

    console.log('Users:', users);
    console.log('User 1 ID:', users[0]._id);
    console.log('User 2 ID:', users[1]._id);

    try {
      const skillsOffered = [
        {
          skillName: 'Web Development',
          experience: 5,
          skillLevel: 'Advanced',
          hoursAvailable: 10,
          daysAvailable: ['Monday', 'Wednesday'],
          userId: users[0]._id,
        },
        {
          skillName: 'Graphic Design',
          experience: 3,
          skillLevel: 'Intermediate',
          hoursAvailable: 8,
          daysAvailable: ['Tuesday', 'Thursday'],
          userId: users[1]._id,
        },
      ];

      // Validate unique and non-null skillName values
      const skillNames = skillsOffered.map(skill => skill.skillName);
      if (new Set(skillNames).size !== skillNames.length) {
        throw new Error('Duplicate skillName values found in seed data.');
      }
      if (skillNames.includes(null)) {
        throw new Error('Null skillName value found in seed data.');
      }

      const insertedSkillsOffered = await SkillOffered.insertMany(skillsOffered);
      console.log('✅ Seeded SkillOffered collection:', insertedSkillsOffered);
    } catch (err) {
      console.error('❌ Error inserting skillsOffered:', err);
    }

    try {
      const skillsNeeded = [
        {
          skillName: 'Marketing',
          skillDescription: 'Promoting products and services',
          daysAvailable: ['Friday', 'Saturday'],
          userId: users[0]._id,
        },
        {
          skillName: 'Data Analysis',
          skillDescription: 'Analyzing data for insights',
          daysAvailable: ['Monday', 'Thursday'],
          userId: users[1]._id,
        },
      ];

      // Validate unique and non-null skillName values
      const skillNames = skillsNeeded.map(skill => skill.skillName);
      if (new Set(skillNames).size !== skillNames.length) {
        throw new Error('Duplicate skillName values found in seed data.');
      }
      if (skillNames.includes(null)) {
        throw new Error('Null skillName value found in seed data.');
      }

      const insertedSkillsNeeded = await SkillNeeded.insertMany(skillsNeeded);
      console.log('✅ Seeded SkillNeeded collection:', insertedSkillsNeeded);
      console.log('Skills Needed:', skillsNeeded);
      
    } catch (err) {
      console.error('❌ Error inserting skillsNeeded:', err);
    }

  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();