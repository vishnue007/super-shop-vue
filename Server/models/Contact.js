const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  desc: {
    type: String,
    required: [true, 'description is required'],
    minlength: [6, 'description must be at least 6 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Remove password when converting to JSON
ContactSchema.methods.toJSON = function() {
  const contact = this.toObject();
  return contact;
};

module.exports = mongoose.model('Contact', ContactSchema);
