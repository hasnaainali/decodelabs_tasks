const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { email } = req.body;
  
  // Check if user exists
  const userExists = User.findByEmail(email);
  
  if (userExists) {
    return res.status(400).json({
      success: false,
      error: 'User already exists with this email'
    });
  }
  
  // Create user
  const user = await User.create(req.body);
  
  res.status(201).json({
    success: true,
    data: user,
    token: generateToken(user.id)
  });
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate user
  const user = await User.validatePassword(email, password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password'
    });
  }
  
  res.status(200).json({
    success: true,
    data: user,
    token: generateToken(user.id)
  });
};

module.exports = {
  registerUser,
  loginUser
};