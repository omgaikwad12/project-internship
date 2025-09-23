// Get references to the HTML elements
const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions-box');
const searchForm = document.getElementById('search-form');

// --- Sample Data for Suggestions ---
// In a real application, you would fetch this from a server/API.
const sampleKeywords = [
    'HTML tutorial',
    'CSS examples',
    'JavaScript basics',
    'How to code',
    'Web development',
    'Python for beginners',
    'Responsive web design',
    'CSS Grid vs Flexbox',
    'Learn React.js',
    'Node.js projects',
    'What is an API'
];

// Listen for input events on the search box
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    
    // Clear previous suggestions
    suggestionsBox.innerHTML = '';

    if (query.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    // Filter keywords that match the query
    const matchingSuggestions = sampleKeywords.filter(keyword => 
        keyword.toLowerCase().includes(query)
    );

    // Display the matching suggestions
    if (matchingSuggestions.length > 0) {
        matchingSuggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = suggestion;
            
            // Add a click event to each suggestion
            suggestionItem.addEventListener('click', () => {
                searchInput.value = suggestion; // Put suggestion in search box
                suggestionsBox.style.display = 'none'; // Hide suggestions
                searchForm.submit(); // Submit the form
            });
            
            suggestionsBox.appendChild(suggestionItem);
        });
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
    }
});

// Hide suggestions when clicking outside the search container
document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target)) {
        suggestionsBox.style.display = 'none';
    }
});