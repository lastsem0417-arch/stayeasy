const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// =======================
// REGISTER
// =======================
router.post('/register', async (req, res) => {

  try {

    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'All fields required' });
    }

    email = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await user.save();

    res.status(201).json({
      msg: 'User registered successfully'
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ msg: 'Server error' });

  }

});



// =======================
// LOGIN
// =======================
router.post('/login', async (req, res) => {

  try {

    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password required' });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({

      token,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }

    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ msg: 'Server error' });

  }

});

module.exports = router;