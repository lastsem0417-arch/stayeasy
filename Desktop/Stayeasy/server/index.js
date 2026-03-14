const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* =====================
   🔥 CORS FIX (FINAL)
   ===================== */
app.use(cors({
  origin: '*',        // 🔥 sab origins allow (dev ke liye best)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

/* =====================
   ROUTES
   ===================== */
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/rooms', require('./routes/room.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

/* =====================
   DB + SERVER
   ===================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});