const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

// POST: Save feedback
router.post("/", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Email and message are required" });
    }

    const feedback = new Feedback({ email, message });
    await feedback.save();

    res.status(201).json({ message: "✅ Feedback received. Thank you!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// GET: View all feedback (for admin use)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching feedback" });
  }
});

module.exports = router;
