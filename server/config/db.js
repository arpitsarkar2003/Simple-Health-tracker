const mongoose = require('mongoose');
const User = require('../models/User'); // Make sure the path to the User model is correct

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Drop the 'username_1' index if it exists
    try {
      await User.collection.dropIndex('username_1');
      console.log('Dropped unnecessary username index');
    } catch (error) {
      if (error.code === 27) {
        console.log('Index not found, skipping index drop');
      } else {
        console.error('Error dropping index:', error.message);
      }
    }

    await User.collection.createIndex({ email: 1 }, { unique: true });
    console.log('Index created on email field');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
