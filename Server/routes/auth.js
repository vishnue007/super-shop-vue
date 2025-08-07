// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const users = []; // Temporary in-memory storage (for demo)

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user
  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully!', user: { name, email } });
});

module.exports = router;
