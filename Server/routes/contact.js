const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Create a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, desc } = req.body;

    // Validate required fields
    if (!name || !email || !desc) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Create new contact message
    const contact = new Contact({
      name,
      email,
      desc
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: contact
    });

  } catch (error) {
    console.error('Contact creation error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact messages (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// GET /api/contact/:id - Get a specific contact message
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router;
