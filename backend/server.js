require('dotenv').config({ path: './.env' });

console.log("MONGODB_URI from env:", process.env.MONGODB_URI);

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/carts');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established');
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check - Put this EARLY
app.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({
    status: 'OK',
    database: dbStatus,
    timestamp: new Date().toISOString(),
    mongoReadyState: mongoose.connection.readyState
  });
});

// Test DB
app.get('/test-db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: "MongoDB is connected!" });
  } catch (err) {
    res.json({ status: "Failed", error: err.message });
  }
});

// Serve Frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

// Catch all route - serve index.html
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
   console.log(`🚀 Server running on port ${PORT}`);
});

