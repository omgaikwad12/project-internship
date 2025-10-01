const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback"); // your model file

// POST feedback
router.post("/", async (req, res) => {
  console.log("📩 Incoming feedback:", req.body);  // 👈 check this
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json({ message: "✅ Feedback saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving feedback:", err);
    res.status(400).json({ error: err.message });
  }
});


// GET feedback (optional)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
