const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "🌿 Plant route is working!" });
});

module.exports = router;  // 👈 Important: export the router
