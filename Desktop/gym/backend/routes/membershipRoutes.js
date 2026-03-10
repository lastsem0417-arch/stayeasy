const express = require('express');
const {
  joinMembership,
  getMyMembership,
  activateMembership,
} = require('../controllers/membershipController');
const { auth, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Member joins a plan
router.post('/join', auth, authorizeRoles('member'), joinMembership);

// Member views own membership(s)
router.get('/my', auth, authorizeRoles('member'), getMyMembership);

// Admin manually activates membership
router.post('/activate', auth, authorizeRoles('admin'), activateMembership);

module.exports = router;

