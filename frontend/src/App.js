import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({ name: "", description: "" });

  // Fetch plants on page load
  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/plants");
      setPlants(res.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  // Add new plant
  const addPlant = async () => {
    if (!newPlant.name || !newPlant.description) return;
    try {
      const res = await axios.post("http://localhost:5000/api/plants", newPlant);
      setPlants([...plants, res.data]);
      setNewPlant({ name: "", description: "" });
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  // Delete plant
  const deletePlant = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/plants/${id}`);
      setPlants(plants.filter((plant) => plant._id !== id));
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🌱 Greenopedia Plant Library</h1>

      {/* Add plant form */}
      <input
        type="text"
        placeholder="Plant name"
        value={newPlant.name}
        onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Description"
        value={newPlant.description}
        onChange={(e) => setNewPlant({ ...newPlant, description: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <button onClick={addPlant}>➕ Add Plant</button>

      {/* Plant list */}
      <ul style={{ marginTop: "20px" }}>
        {plants.map((plant) => (
          <li key={plant._id} style={{ marginBottom: "10px" }}>
            <b>{plant.name}</b> - {plant.description}
            <button
              onClick={() => deletePlant(plant._id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

