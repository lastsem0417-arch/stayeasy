const mongoose = require("mongoose");
require("dotenv").config();

// 🔥 MODEL PATH CHECK (MOST IMPORTANT)
const Room = require("./models/Room");

/* =========================
   ROOM DATA
   ========================= */
const rooms = [
  {
    name: "Standard Single Room",
    type: "Standard",
    price: 1200,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
  },
  {
    name: "Deluxe City View Room",
    type: "Deluxe",
    price: 2800,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    name: "Premium King Room",
    type: "Premium",
    price: 4500,
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
  },
  {
    name: "Executive Suite",
    type: "Suite",
    price: 6500,
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061"
  },
  {
    name: "Private Pool Villa",
    type: "Villa",
    price: 12000,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f"
  }
];

async function seedRooms() {
  try {
    console.log("🔁 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🧹 Deleting old rooms...");
    await Room.deleteMany();

    console.log("➕ Inserting rooms...");
    await Room.insertMany(rooms);

    console.log("✅ Rooms seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedRooms();