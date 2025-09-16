const mongoose = require("mongoose");
const Plant = require("./models/Plant");

// Replace with your MongoDB connection string
const MONGO_URI = "mongodb+srv://Sanskarsatale19:Bappa%4011@cluster0.9bqg4pi.mongodb.net/greenopedia?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await Plant.insertMany([
      {
        name: "Rose",
        scientificName: "Rosa",
        description: "Roses are woody perennial flowering plants known for their beauty and fragrance.",
        habitat: "Gardens, temperate regions",
        medicinalUses: "Used in perfumes, rose water, and sometimes in herbal medicine."
      },
      {
        name: "Tulip",
        scientificName: "Tulipa",
        description: "Tulips are bulbous plants with bright, colorful cup-shaped flowers.",
        habitat: "Gardens, meadows, temperate climates",
        medicinalUses: "Mostly ornamental, limited medicinal use."
      },
      {
        name: "Neem",
        scientificName: "Azadirachta indica",
        description: "Neem is a fast-growing tree native to India, known for its medicinal properties.",
        habitat: "Tropical and subtropical regions",
        medicinalUses: "Used in Ayurveda for skin treatments, immunity boosting, and pest control ."
      }
    ]);

    console.log("🌱 Sample plants added!");
    mongoose.connection.close();
  })
  .catch(err => console.error("❌ Error:", err));
