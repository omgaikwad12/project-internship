const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Base URL for Trefle API
const TREFLE_API = "https://trefle.io/api/v1/plants/search";
const API_KEY = process.env.TREFLE_API_KEY;

// 🔍 Search plant by name
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query; // Example: ?q=rose
    if (!q) return res.status(400).json({ error: "Plant name is required" });

    // Call Trefle API
    const response = await axios.get(`${TREFLE_API}?token=${API_KEY}&q=${q}`);
    
    res.json(response.data);
  } catch (error) {
    console.error("❌ Plant search error:", error.message);
    res.status(500).json({ error: "Failed to fetch plant info" });
  }
});

module.exports = router;
