const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const app = express();
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});