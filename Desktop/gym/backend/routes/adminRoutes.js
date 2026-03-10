const express = require('express');
const { getMembers } = require('../controllers/adminController');
const { auth, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/admin/users - view members only
router.get('/users', auth, authorizeRoles('admin'), getMembers);

module.exports = router;

