const mongoose = require('mongoose');

const connectDB = async () => {
  const uri =
    process.env.MONGO_URI ||
    'mongodb+srv://lastsem0417_db_user:lastsemproject@smartgrocery.2wf8kff.mongodb.net/gym?retryWrites=true&w=majority';
  try {
    // Mongoose 9+ no longer needs useNewUrlParser / useUnifiedTopology options
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

