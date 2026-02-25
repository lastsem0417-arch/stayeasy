const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.addRoom = async (req, res) => {
  await Room.create(req.body);
  res.json({ msg: "Room added" });
};

exports.deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ msg: "Room deleted" });
};