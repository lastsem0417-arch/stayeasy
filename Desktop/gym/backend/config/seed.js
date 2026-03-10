const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return;
    }

    const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name: process.env.DEFAULT_ADMIN_NAME || 'Default Admin',
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@fittrack.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Default admin user created');
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};

module.exports = { seedAdmin };

