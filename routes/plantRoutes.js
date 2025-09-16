const express = require("express");
const Plant = require("../models/Plant");
const router = express.Router();

// Get all plants
router.get("/", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new plant
router.post("/", async (req, res) => {
  try {
    const newPlant = new Plant(req.body);
    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

