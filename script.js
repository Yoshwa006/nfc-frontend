// Get item ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

if (!itemId) {
    document.getElementById("item-details").innerHTML = "<p>No item ID provided.</p>";
} else {
    fetch(`https://nfc-rental-system2-1.onrender.com/items/${itemId}`)
        .then(response => response.json())
        .then(data => {
            // Store the password for validation
            const correctPassword = data.password; 

            document.getElementById("item-details").innerHTML = `
                <img src="download.jpeg" alt="Item Image">
                <div class="item-de">
                    <h2>Item Name: <span id="itemName" contenteditable="false">${data.itemName}</span></h2>
                    <p><strong>Price:</strong> &#8377; <span id="price" contenteditable="false">${data.price}</span></p>
                    <p><strong>Description:</strong> <span id="description" contenteditable="false">${data.description}</span></p>
                    <p><strong>Owner:</strong> <span id="owner" contenteditable="false">${data.ownerName}</span></p>
                    <p><strong>Contact:</strong> <span id="phone" contenteditable="false">${data.phone}</span></p>
                    <p><strong>Available:</strong> <span id="available" contenteditable="false">${data.available ? "Yes" : "No"}</span></p>
                </div>
                <button id="modify-btn">Modify</button>
                <button id="save-btn" style="display: none;">Save</button>
            `;

            document.getElementById("modify-btn").addEventListener("click", function () {
                const userPassword = prompt("Enter password to modify:");

                if (userPassword === correctPassword) {
                    makeEditable();
                } else {
                    alert("Incorrect password!");
                }
            });
            
            document.getElementById("save-btn").addEventListener("click", function () {
                
                const updatedData = {
                    itemName: document.getElementById("itemName").textContent,
                    price: document.getElementById("price").textContent,
                    description: document.getElementById("description").textContent,
                    ownerName: document.getElementById("owner").textContent,
                    phone: document.getElementById("phone").textContent,
                    available: document.getElementById("available").textContent === "Yes",
                    password: correctPassword // Ensure password remains the same
                };
                console.log(updatedData);
                fetch(`https://nfc-rental-system2-1.onrender.com/items/${itemId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData) // ✅ Sending only updated fields, not `id`
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to update item");
                    }
                    return response.json();
                })
                .then(data => {
                    alert("Item updated successfully!");
                    location.reload(); // Refresh to see changes
                })
                .catch(error => {
                    console.error("Error updating item:", error);
                    alert("Failed to update item.");
                });
            });

            function makeEditable() {
                document.getElementById("itemName").contentEditable = "true";
                document.getElementById("price").contentEditable = "true";
                document.getElementById("description").contentEditable = "true";
                document.getElementById("owner").contentEditable = "true";
                document.getElementById("phone").contentEditable = "true";
                document.getElementById("available").contentEditable = "true";

                document.getElementById("modify-btn").style.display = "none";
                document.getElementById("save-btn").style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error fetching item:", error);
            document.getElementById("item-details").innerHTML = "<p>Failed to load item details.</p>";
        });
}
