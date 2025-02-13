// Get item ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

if (!itemId) {
    document.getElementById("item-details").innerHTML = "<p>No item ID provided.</p>";
} else {
    fetch(`https://nfc-rental-system2-1.onrender.com/items/${itemId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("item-details").innerHTML = `
                <h2>${data.itemName}</h2>
                
            `;
        })
        .catch(error => {
            console.error("Error fetching item:", error);
            document.getElementById("item-details").innerHTML = "<p>Failed to load item details.</p>";
        });
}
