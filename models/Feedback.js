// models/feedback.js

const mongoose = require('mongoose');

// This is the blueprint for our feedback data
const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true, // Removes any extra whitespace
        lowercase: true
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true
    },
    submittedAt: {
        type: Date,
        default: Date.now // Automatically sets the submission date
    }
});

// Create the model from the schema and export it
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;