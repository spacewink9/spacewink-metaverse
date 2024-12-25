const User = require('../models/User'); // User model
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const { validationResult } = require('express-validator'); // For input validation
const { JWT_SECRET } = require('../config/environment'); // Environment configurations

/**
 * @desc Register a new user
 * @route POST /api/users/register
 * @access Public
 */
const registerUser = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error('Error in registerUser:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @desc Login a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error('Error in loginUser:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @desc Get logged-in user details
 * @route GET /api/users/me
 * @access Private
 */
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User details fetched successfully',
            user,
        });
    } catch (error) {
        console.error('Error in getMe:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @desc Update user profile
 * @route PUT /api/users/me
 * @access Private
 */
const updateProfile = async (req, res) => {
    try {
        const updates = req.body;

        // Update user details
        const user = await User.findByIdAndUpdate(req.user.id, updates, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User profile updated successfully',
            user,
        });
    } catch (error) {
        console.error('Error in updateProfile:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * @desc Delete a user account
 * @route DELETE /api/users/me
 * @access Private
 */
const deleteAccount = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User account deleted successfully',
        });
    } catch (error) {
        console.error('Error in deleteAccount:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateProfile,
    deleteAccount,
};
              
