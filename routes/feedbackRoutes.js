// routes/feedbackRoutes.js

const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback'); // Import the model we just created

// This handles POST requests to /api/feedback/
router.post('/', async (req, res) => {
    try {
        // Get the email and message from the request body
        const { email, message } = req.body;

        // Basic validation
        if (!email || !message) {
            return res.status(400).json({ message: 'Please provide both email and message.' });
        }

        // Create a new feedback document using our model
        const newFeedback = new Feedback({
            email: email,
            message: message
        });

        // Save the new feedback document to the MongoDB database
        await newFeedback.save();

        // Send a success response back to the frontend
        res.status(201).json({ message: 'Feedback received successfully!' });

    } catch (error) {
        // If an error occurs, log it and send a server error response
        console.error("Error saving feedback:", error);
        res.status(500).json({ message: 'Server error. Could not save feedback.' });
    }
});

module.exports = router;