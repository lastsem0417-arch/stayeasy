const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

/* =========================
   CREATE BOOKING
   ========================= */
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ msg: "Booking successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* =========================
   USER BOOKINGS
   ========================= */
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking
      .find({ userId: req.params.userId })
      .populate("roomId"); // 🔥 ROOM JOIN
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* =========================
   ADMIN: ALL BOOKINGS
   ========================= */
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking
      .find()
      .populate("roomId"); // 🔥 ROOM JOIN
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

/* =========================
   🔥 ADMIN: DELETE BOOKING
   ========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;