import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');

    // Admin user details
    const adminUser = {
      name: 'Admin User',
      email: 'admin@finedu.com',
      password: 'Admin@123', // This will be hashed
      isAdmin: true,
      phone: 1234567890,
      bio: 'Administrator of FinEdu',
      title: 'Admin',
      // Add other required fields with default values
      inventory: {
        avatar: [{
          attack: 10,
          defense: 5,
          name: "Admin Avatar",
          desc: "Admin's default avatar",
          image: "/assets/avatars/a-1.png"
        }],
        potions: [],
        boosts: []
      },
      tasks: [],
      blessons: {
        questions: Array(15).fill().map((_, index) => ({
          index: index + 1,
          solved: false,
          visited: false
        })),
        score: 0,
        submitted: false
      },
      flessons: {
        questions: Array(15).fill().map((_, index) => ({
          index: index + 1,
          solved: false,
          visited: false
        })),
        score: 0,
        submitted: false
      },
      investlessons: {
        questions: Array(15).fill().map((_, index) => ({
          index: index + 1,
          solved: false,
          visited: false
        })),
        score: 0,
        submitted: false
      },
      gaming: {
        health: 50,
        avatar: {
          attack: 10,
          defense: 5,
          image: "/assets/avatars/a-1.png"
        },
        exp: 0,
        level: 1,
        maxHealth: 50,
        maxExp: 100
      }
    };

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      // Update existing admin's isAdmin status
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
      console.log('Updated existing user to admin');
    } else {
      // Hash the password
      const passwordHash = await bcrypt.hash(adminUser.password, 10);
      adminUser.password = passwordHash;

      // Create new admin user
      const newAdmin = new User(adminUser);
      await newAdmin.save();
      console.log('Admin user created successfully');
    }

    console.log('Admin user setup completed');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser(); 