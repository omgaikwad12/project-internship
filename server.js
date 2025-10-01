const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const plantRoutes = require("./routes/plants");
const feedbackRoutes = require("./routes/feedbackRoutes");


app.use("/api/plants", plantRoutes);
app.use("/api/feedback", feedbackRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("🌱 Greenopedia backend is running with MongoDB connection.");
});

// Start server
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
  console.log(`✅ Greenopedia backend running on http://localhost:${PORT}`);
});
