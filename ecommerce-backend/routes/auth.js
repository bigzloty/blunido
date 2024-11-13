// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model for MongoDB

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Store securely in env file

// Sign Up
router.post('/signup', async (req, res) => {
    const { country, email, first_name, surname, password, shopping_preference, dob, } = req.body;
    try {
        console.log(dob)
        const date = new Date(dob).toISOString()
        if (date.includes("valid")) {
            throw { message: "date" }
        }
        const details = {
            country,
            email,
            first_name,
            surname,
            password,
            shopping_preference,
            dob: date
        }
        console.log(dob)
        const createUser = User.create(details)
        const token = jwt.sign(createUser, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
        res.status(201).json({
            data: createUser,
            message: "User Created Successfully",
            token
        })

    } catch (error) {
        console.log(error.message)
        if (error.code === 11000) {
            res.status(400).json({ message: "User Already exist" });
        }
        res.status(400).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User does not exist' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);


        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Create JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user' });
    }
});

module.exports = router;