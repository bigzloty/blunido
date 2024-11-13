const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing
const Schema = mongoose.Schema;

// Define the schema for the user
const userSchema = new Schema({
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    first_name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should be at least 6 characters long'],
    },
    shopping_preference: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: true,
    },
});

// Hash the password before saving (using bcrypt)
userSchema.pre('save', async function (next) {
    try {
        // Only hash the password if it has been modified or is new
        if (!this.isModified('password')) return next();

        // Generate a salt with 10 rounds
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the salt
        this.password = await bcrypt.hash(this.password, salt);

        // Proceed with the save operation
        next();
    } catch (error) {
        // Handle any errors during hashing
        next(error);
    }
});

// Compare provided password with the stored hash (for login)
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
