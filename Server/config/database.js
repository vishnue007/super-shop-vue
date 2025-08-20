const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // You can change this URI to your MongoDB connection string
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vue-auth-app';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Make sure MongoDB is running on your system');
    process.exit(1);
  }
};

module.exports = connectDB;
