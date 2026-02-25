const Booking = require("../models/Booking");
const Room = require("../models/Room");

exports.bookRoom = async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    userId: req.user.id
  });

  await Room.findByIdAndUpdate(req.body.roomId, { isAvailable: false });
  res.json(booking);
};

exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate("roomId");
  res.json(bookings);
};

exports.allBookings = async (req, res) => {
  const bookings = await Booking.find().populate("roomId userId");
  res.json(bookings);
};

exports.deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  await Room.findByIdAndUpdate(booking.roomId, { isAvailable: true });
  await booking.deleteOne();
  res.json({ msg: "Booking deleted" });
};