const express = require('express');
const { getMembers } = require('../controllers/adminController');
const { auth, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/users - admin view members only
router.get('/', auth, authorizeRoles('admin'), getMembers);

module.exports = router;

