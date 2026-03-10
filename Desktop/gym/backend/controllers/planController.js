const Plan = require('../models/Plan');

// POST /api/plans (admin)
const createPlan = async (req, res) => {
  try {
    const { name, duration, price } = req.body;

    if (!name || !duration || price == null) {
      return res.status(400).json({ message: 'Name, duration and price are required' });
    }

    const plan = await Plan.create({ name, duration, price });
    return res.status(201).json({ message: 'Plan created successfully', plan });
  } catch (error) {
    console.error('Create plan error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/plans (public/member/admin)
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    return res.status(200).json(plans);
  } catch (error) {
    console.error('Get plans error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createPlan, getPlans };

