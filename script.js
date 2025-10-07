
let plants = [];

// Load the plants.json file
fetch("plants.json")
  .then(res => res.json())
  .then(data => { plants = data; })
  .catch(err => console.error("Error loading plants.json:", err));

const searchInput = document.getElementById("plant-search");
const suggestions = document.getElementById("search-suggestions");
const plantDetails = document.getElementById("plant-details");
const plantName = document.getElementById("plant-name");
const plantDescription = document.getElementById("plant-description");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  suggestions.innerHTML = "";

  if (query.length > 0) {
    const matches = plants.filter(p => p.name.toLowerCase().includes(query));
    matches.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.name;
      li.onclick = () => {
        searchInput.value = p.name;
        suggestions.innerHTML = "";
        showPlantDetails(p);
      };
      suggestions.appendChild(li);
    });
  }
});

function showPlantDetails(plant) {
  plantName.textContent = plant.name;
  plantDescription.textContent = plant.description;
  
  const img = document.getElementById("plant-image");
  if (plant.image_url) {
    img.src = plant.image_url;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }

  plantDetails.style.display = "block";
}
