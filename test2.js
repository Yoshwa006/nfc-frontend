// Define the URL of the backend endpoint
const backendUrl = 'https://nfc-rental-system2-1.onrender.com/items';

// Define the data to be sent in the POST request
const postData = {
    itemName: "iuwbcuiwncnncn",
    images: null,
    price: 32434,
    description: "Dell Inspiron 15",
    ownerName: "John Doe",
    phone: "9876543210",
    password: "allwin",
    available: true
};

// Send the POST request using fetch
fetch(backendUrl, {
    method: 'POST', // Specify the request method
    headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
    },
    body: JSON.stringify(postData) // Convert the data to a JSON string
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok'); // Handle HTTP errors
    }
    return response.text(); // Parse the response as text (since it's a URL)
})
.then(data => {
    console.log('Received link from backend:', data); // Log the received link
    // You can now use the link, e.g., redirect the user or display it
    window.location.href = data; // Redirect the user to the received link
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error); // Handle errors
});