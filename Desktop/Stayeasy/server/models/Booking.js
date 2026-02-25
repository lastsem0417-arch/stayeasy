const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room" // 🔥 MUST
  },
  checkIn: String,
  nights: Number
});

module.exports = mongoose.model("Booking", bookingSchema);