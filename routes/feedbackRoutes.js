const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: "Email and message required" });
    }

    const newFeedback = new Feedback({ email, message });
    await newFeedback.save();

    res.json({ success: true, msg: "Feedback stored successfully" });
  } catch (err) {
    console.error("❌ Error saving feedback:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
