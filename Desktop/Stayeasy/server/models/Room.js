const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  image: String,
  isAvailable: {
    type: Boolean,
    default: true // 🔥 IMPORTANT
  }
});

module.exports = mongoose.model("Room", roomSchema);