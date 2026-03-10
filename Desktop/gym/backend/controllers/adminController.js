const User = require('../models/User');

// GET /api/admin/users (view members only)
const getMembers = async (req, res) => {
  try {
    const members = await User.find({ role: 'member' }).select('-password').sort({ createdAt: -1 });
    return res.status(200).json(members);
  } catch (error) {
    console.error('Get members error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMembers };

