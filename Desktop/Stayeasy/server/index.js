const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =======================
   CORS CONFIG
   ======================= */
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.use(express.json());

/* =======================
   🔥 DISABLE CACHE (IMPORTANT FIX)
   ======================= */
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

/* =======================
   ROUTES
   ======================= */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/rooms", require("./routes/room.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));

/* =======================
   TEST ROUTE
   ======================= */
app.get("/", (req, res) => {
  res.send("StayEasy Backend Running 🚀");
});

/* =======================
   DATABASE
   ======================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Error ❌", err));

/* =======================
   SERVER
   ======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});