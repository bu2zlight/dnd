let items = [
    { type: "Weapon", name: "Longsword", accuracy: 5 },
    // ... Add more initial items if you'd like
];

function addItem() {
    const type = document.getElementById("itemType").value;
    const name = document.getElementById("itemName").value;
    const accuracy = document.getElementById("itemAccuracy").value;

    // Data Validation (add checks to make sure fields aren't empty)

    const newItem = { type: type, name: name, accuracy: accuracy };
    items.push(newItem);
    displayItemList(); 
    resetForm(); 
} 

function displayItemList() {
    // ...(Code from previous example to display the list) ...
}

function editItem(index) {
    // ... (Populate form with item data for editing - coming soon) ...
}

function deleteItem(index) {
    // ... (Remove item at 'index' and redisplay the list - coming soon)...
}

function cancelEdit() {
    resetForm();
}

function resetForm() {
    // ... (Resets the form - code from previous example) ...
}

// Initial display on page load
displayItemList(); 