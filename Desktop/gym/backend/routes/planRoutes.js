const express = require('express');
const { createPlan, getPlans } = require('../controllers/planController');
const { auth, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Public / member / admin can view plans
router.get('/', getPlans);

// Admin only can create plan
router.post('/', auth, authorizeRoles('admin'), createPlan);

module.exports = router;

