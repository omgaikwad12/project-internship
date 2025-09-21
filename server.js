const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Gemini AI
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Routes
const plantRoutes = require("./routes/plantRoutes");
app.use("/api/plants", plantRoutes);
const chatbotRoutes = require("./routes/chatbotRoutes");
app.use("/api/chatbot", chatbotRoutes);

// Chatbot route (no need for separate file unless you want modularity)
app.post("/api/chatbot", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const result = await model.generateContent(userMessage);

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("❌ Error in /api/chatbot:", error);
    res.status(500).json({ reply: "⚠️ Error connecting to Gemini API" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("🌱 Greenopedia backend is running with MongoDB & Chatbot!");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Greenopedia backend running on http://localhost:${PORT}`);
});
