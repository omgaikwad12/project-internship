const express = require("express");
<<<<<<< HEAD
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

const API_KEY = "WqZIsc0arrvb2IEysFupb5cINJA2V5R98aJ6v9P1yJH0fjZG3q"; // put your key here

// Allow frontend to access backend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/identify", upload.single("image"), async (req, res) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    const response = await axios.post(
      "https://api.plant.id/v3/identification",
      {
        images: [base64Image],
        classification_level: "species",
        similar_images: true
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

    // ✅ Log the full response to see real structure
    console.log(JSON.stringify(response.data, null, 2));

    // Remove temp uploaded file
    fs.unlinkSync(req.file.path);

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Plant identification failed" });
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
 
const path = require("path");

// Serve frontend index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
=======
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

// Routes
const plantRoutes = require("./routes/plantRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes"); // <-- added

app.use("/api/plants", plantRoutes);
app.use("/api/chatbot", chatbotRoutes); // <-- added

// Test route
app.get("/", (req, res) => {
  res.send("🌱 Greenopedia backend is running with MongoDB & Chatbot!");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Greenopedia backend running on http://localhost:${PORT}`);
>>>>>>> a08b54be657747dc1940eecdb2a2f49bf21929f6
});
