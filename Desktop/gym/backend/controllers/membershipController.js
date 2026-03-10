const Membership = require('../models/Membership');
const Plan = require('../models/Plan');
const User = require('../models/User');

// Utility: parse duration like "1 month", "3 months"
const calculateEndDate = (startDate, durationString) => {
  const [countStr, unitRaw] = durationString.split(' ');
  const count = parseInt(countStr, 10) || 0;
  const unit = (unitRaw || '').toLowerCase();
  const end = new Date(startDate);

  if (unit.startsWith('month')) {
    end.setMonth(end.getMonth() + count);
  } else if (unit.startsWith('year')) {
    end.setFullYear(end.getFullYear() + count);
  } else if (unit.startsWith('day')) {
    end.setDate(end.getDate() + count);
  } else {
    // default: treat as months
    end.setMonth(end.getMonth() + count);
  }
  return end;
};

// POST /api/membership/join (member)
const joinMembership = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;

    if (!planId) {
      return res.status(400).json({ message: 'Plan is required' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const startDate = new Date();
    const endDate = calculateEndDate(startDate, plan.duration);

    const membership = await Membership.create({
      userId,
      planId: plan._id,
      startDate,
      endDate,
      status: 'active',
    });

    return res.status(201).json({
      message: 'Membership created successfully',
      membership,
    });
  } catch (error) {
    console.error('Join membership error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/membership/my (member)
const getMyMembership = async (req, res) => {
  try {
    const userId = req.user._id;

    const memberships = await Membership.find({ userId })
      .populate('planId')
      .sort({ createdAt: -1 });

    return res.status(200).json(memberships);
  } catch (error) {
    console.error('Get my membership error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/membership/activate (admin)
const activateMembership = async (req, res) => {
  try {
    const { userId, planId, startDate } = req.body;
    if (!userId || !planId) {
      return res.status(400).json({ message: 'User and Plan are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const start = startDate ? new Date(startDate) : new Date();
    const end = calculateEndDate(start, plan.duration);

    const membership = await Membership.create({
      userId: user._id,
      planId: plan._id,
      startDate: start,
      endDate: end,
      status: 'active',
    });

    return res.status(201).json({
      message: 'Membership activated successfully',
      membership,
    });
  } catch (error) {
    console.error('Activate membership error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  joinMembership,
  getMyMembership,
  activateMembership,
};

