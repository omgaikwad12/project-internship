const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Email and message are required" });
    }

    const feedback = new Feedback({ email, message });
    await feedback.save();   // 👈 this saves to MongoDB

    res.status(201).json({ message: "✅ Feedback saved successfully", feedback });
  } catch (err) {
    console.error("❌ Error saving feedback:", err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// GET all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error("❌ Error fetching feedback:", err);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

module.exports = router;
