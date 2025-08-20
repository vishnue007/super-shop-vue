// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Log for debugging
    console.log('New user registered:', { name, email });
    console.log('User saved to MongoDB');

    res.status(201).json({ 
      message: 'User registered successfully!', 
      user: newUser.toJSON() 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // 3. Update last login
    user.lastLogin = new Date();
    await user.save();

    // 4. Create token
    const token = jwt.sign({ 
      userId: user._id, 
      email: user.email 
    }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ 
      success: true, 
      message: 'Login successful', 
      token,
      user: user.toJSON()
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(400).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    // Verify token to get user info
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Update user's last logout time (optional)
    await User.findByIdAndUpdate(decoded.userId, {
      lastLogout: new Date()
    });

    // Log the logout action
    console.log(`User ${decoded.email} logged out`);

    res.json({ 
      success: true, 
      message: 'Logout successful' 
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during logout' 
    });
  }
});

// Get all users (for admin purposes - remove in production)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    
    // Format the response for better readability
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      lastLogout: user.lastLogout
    }));
    
    res.json({ 
      totalUsers: users.length, 
      users: formattedUsers,
      message: `Found ${users.length} user(s) in database`
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get users count only
router.get('/users/count', async (req, res) => {
  try {
    const count = await User.countDocuments({});
    res.json({ 
      totalUsers: count,
      message: `Database contains ${count} user(s)`
    });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ message: 'Error counting users' });
  }
});

// Get user profile by ID
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

module.exports = router;
