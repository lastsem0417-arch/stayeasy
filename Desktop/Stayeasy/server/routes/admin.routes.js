const express = require('express');
const router = express.Router();

const Room = require('../models/Room');
const Booking = require('../models/Booking');
const User = require('../models/User');

router.get('/stats', async (req,res)=>{
  try{

    const rooms = await Room.countDocuments();
    const bookings = await Booking.countDocuments();
    const users = await User.countDocuments();

    res.json({
      rooms,
      bookings,
      users
    });

  }catch(err){
    res.status(500).json({msg:err.message});
  }
});

module.exports = router;