// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model for MongoDB

const router = express.Router();
const JWT_SECRET = process.env.SECRET_KEY; // Store securely in env file

// Sign Up
router.post("/signup", async (req, res) => {
  const {
    country,
    email,
    first_name,
    surname,
    password,
    shopping_preference,
    dob,
  } = req.body;
  try {
    const date = new Date(dob).toISOString();
    if (date.includes("valid")) {
      throw { message: "Date is not valid" };
    }
    const details = {
      country,
      email,
      first_name,
      surname,
      password,
      shopping_preference,
      dob: date,
    };
    const createUser = await User.create(details);
    const { _id: id, first_name: name } = createUser;

    const token = jwt.sign({ id, name }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      data: createUser,
      message: "User Created Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ message: "User Already exist" });
      return;
    }
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User does not exist" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, message: "Login Successfull" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
});

router.get("/isauth", async (req, res) => {
  try {
    if(req.headers.authorization === undefined) throw { message: "No Token Provided" };
    const token = req.headers.authorization.split(" ")[1];

    const verified = await jwt.verify(token, JWT_SECRET);
    console.log(verified);
    if (!verified) throw { message: "Token is Invalid" };

    const user = await User.findById(verified.id);
    if (!user) throw { message: "User Not Found" };

    return res.json({
      message: `Welcome back ${verified.name}`,
      status: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

module.exports = router;
