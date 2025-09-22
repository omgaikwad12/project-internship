document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;

  if (!query) return;

  try {
    const response = await fetch(`/api/plants/search?q=${query}`);
    const data = await response.json();

    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";

    if (data.data && data.data.length > 0) {
      data.data.forEach((plant) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${plant.common_name || "Unknown Plant"}</h3>
          <p><b>Scientific:</b> ${plant.scientific_name}</p>
          <img src="${plant.image_url || ""}" width="200">
        `;
        resultDiv.appendChild(div);
      });
    } else {
      resultDiv.innerHTML = "<p>No results found.</p>";
    }
  } catch (err) {
    console.error("Error fetching plant data:", err);
  }
});

