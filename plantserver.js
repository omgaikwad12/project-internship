// const express = require("express");
// const multer = require("multer");
// const axios = require("axios");
// const fs = require("fs");
 
// const path = require("path");

// const app = express();
// const upload = multer({ dest: "uploads/" });

// const API_KEY = "WqZIsc0arrvb2IEysFupb5cINJA2V5R98aJ6v9P1yJH0fjZG3q"; // put your key here

// app.use(express.static(path.join(__dirname)));

// // Allow frontend to access backend
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   next();
// });

// app.post("/identify", upload.single("image"), async (req, res) => {
//   try {
//     const imageBuffer = fs.readFileSync(req.file.path);
//     const base64Image = imageBuffer.toString("base64");

//     const response = await axios.post(
//       "https://api.plant.id/v3/identification",
//       {
//         images: [base64Image],
//         classification_level: "species",
//         similar_images: true
//       },
//       {
//         params: {
//           details: "common_names,url,wiki_description,taxonomy"
//         },
//         headers: {
//           "Content-Type": "application/json",
//           "Api-Key": API_KEY,
//         },
//       }
//     );

//     // ✅ Log the full response to see real structure
//     console.log(JSON.stringify(response.data, null, 2));

//     // Remove temp uploaded file
//     fs.unlinkSync(req.file.path);

//     res.json(response.data);
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res.status(500).json({ error: "Plant identification failed" });
//   }
// });


// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });


// // Serve frontend index.html
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });
