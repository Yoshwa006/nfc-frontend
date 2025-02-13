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
                <img src="download.jpeg" alt="Item Image">
                <h2>Item Name: ${data.itemName}</h2>
                <p><strong>Price:</strong> &#8377; ${data.price}</p>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Owner:</strong> ${data.ownerName}</p>
                <p><strong>Contact:</strong> ${data.phone}</p>
                <p><strong>Available:</strong> ${data.available ? "Yes" : "No"}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching item:", error);
            document.getElementById("item-details").innerHTML = "<p>Failed to load item details.</p>";
        });
}
