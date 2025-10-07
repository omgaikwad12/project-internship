// server.js - Complete and Corrected Greenopedia Backend Application

// --- 1. Core Setup and External Modules ---
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// --- 2. Configuration and Environment ---
// CRITICAL: REPLACE THE TEXT BELOW with your actual, active Plant.ID API key
const API_KEY = "WqZIsc0arrvb2IEysFupb5cINJA2V5R98aJ6v9P1yJH0fjZG3q"; 

const upload = multer({ dest: "uploads/" }); // Multer setup: requires an 'uploads/' folder
const PORT = process.env.PORT || 5501; // Use environment port or 5501

// --- 3. Middleware ---
app.use(express.json()); 
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.static(path.join(__dirname))); 

// --- 4. MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- 5. Database Routes ---
const plantRoutes = require("./routes/plants");
const feedbackRoutes = require("./routes/feedbackRoutes");

app.use("/api/plants", plantRoutes);
app.use("/api/feedback", feedbackRoutes);

// --- 6. Plant Identification Route (POST /identify) ---
app.post("/identify", upload.single("image"), async (req, res) => {
  try {
    // Check 1: Ensure a file was actually uploaded
    if (!req.file) {
      console.error("❌ Identification Error: No image file received.");
      return res.status(400).json({ error: "No image file uploaded." });
    }


    // Read the image file and convert it to Base64 format
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    // Make the external API call to Plant.ID
    const response = await axios.post(
      "https://api.plant.id/v3/identification",
      {
        images: [base64Image],
        classification_level: "species",
        similar_images: true,
      },
      {
        params: {
          details: "common_names,url,wiki_description,taxonomy"
        },
        headers: {
          "Content-Type": "application/json",
          "Api-Key": API_KEY, 
        },
      }
    );

    // Clean up temp uploaded file and send response
    fs.unlinkSync(req.file.path);
    res.json(response.data);
    
  } catch (err) {
    // --- Detailed Error Logging and Cleanup ---
    console.error("❌ ERROR DURING PLANT IDENTIFICATION PROCESS:");
    
    // Log details from the external API if available
    if (err.response) {
      console.error("  API Status:", err.response.status);
      console.error("  API Error Data:", JSON.stringify(err.response.data));
    } else {
      console.error("  Network/Internal Error:", err.message);
    }
    
    // Clean up the uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Send a generic error response to the frontend
    res.status(500).json({ error: "Plant identification failed due to an error on the server." });
  }
});

// --- 7. General Routes ---

// Test/Status route
app.get("/api/status", (req, res) => {
  res.send("🌱 Greenopedia backend is running with MongoDB connection.");
});

// Serve frontend index.html (This should be the last GET route)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


// --- 8. Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Greenopedia backend running on http://localhost:${PORT}`);
});