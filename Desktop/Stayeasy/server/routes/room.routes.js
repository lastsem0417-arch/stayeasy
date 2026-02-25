const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// =======================
// GET ALL ROOMS (NO FILTER ❗)
// =======================
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find({}); // 🔥 NO isAvailable FILTER
    console.log("ROOMS FROM DB 👉", rooms); // DEBUG
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET SINGLE ROOM BY ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// =======================
// ADD ROOM
// =======================
router.post("/", async (req, res) => {
  try {
    const room = new Room({
      ...req.body,
      isAvailable: true // 🔥 FORCE TRUE
    });

    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;