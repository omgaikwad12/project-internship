import React, { useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/plants?name=${search}`);
      setPlants(res.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🌱 Greenopedia</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search plant name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />
      <button
        onClick={handleSearch}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Search
      </button>

      {/* Results */}
      <div style={{ marginTop: "20px" }}>
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div
              key={plant._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h2>{plant.name}</h2>
              <p>{plant.description}</p>
              {plant.image && (
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={{ width: "200px", borderRadius: "5px" }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No plants found. Try searching!</p>
        )}
      </div>
    </div>
  );
}

export default App;



