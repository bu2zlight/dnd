document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs li");
  const tabContent = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
      tab.addEventListener("click", () => {
          switchTab(tab.dataset.tab); 
      });
  });

  function switchTab(targetTab) {
      tabs.forEach(tab => tab.classList.remove("active"));
      tabContent.forEach(content => content.style.display = "none");

      document.querySelector(`[data-tab="${targetTab}"]`).classList.add("active"); 
      document.getElementById(targetTab).style.display = "block";
      if (targetTab === "itemManagement") {
        const itemManagementDiv = document.getElementById("itemManagement"); 

        if (itemManagementDiv.innerHTML === "") { 
            fetch("item_management.html")
                .then(response => response.text())
                .then(html => {
                    itemManagementDiv.innerHTML = html;
                    // Initialize any scripts from 'item_management.js' here
                });
        }
    }
      if (targetTab === "calculator") {
        document.getElementById("calculator").querySelector("#diceSetCount button:first-of-type").addEventListener("click", incrementSets); // Increment
        document.getElementById("calculator").querySelector("#diceSetCount button:nth-of-type(2)").addEventListener("click", decrementSets); // Decrement  
        document.getElementById("calculator").querySelector("#calculator button:nth-of-type(1)").addEventListener("click", damageRoll); // Calculate button
        document.getElementById("calculator").querySelector("#calculator button:nth-of-type(2)").addEventListener("click", resetCalculator); // Reset button
    }
  }
});

let setCounter = 1;

function incrementSets() {
  setCounter++;
  updateSetCountDisplay();
  createDiceSet(); 
}

function decrementSets() {
  if (setCounter > 1) {
    setCounter--;
    updateSetCountDisplay();
    removeDiceSet(); 
  }
}

function updateSetCountDisplay() {
    document.getElementById("setCount").textContent = setCounter;
}

function createDiceSet() {
  const diceSets = document.getElementById("diceSets"); 
  const newSet = document.createElement("div"); 
  newSet.id = "diceSet" + setCounter;  

  newSet.innerHTML = ` 
    <input type="number" id="quantity${setCounter}" placeholder="Quantity" value="1"> 
    <input type="number" id="modifier${setCounter}" placeholder="Modifier" value="0">
    <select id="diceType${setCounter}"> 
      <option value="20">d20</option>
      <option value="12">d12</option>
      <option value="10">d10</option>
      <option value="8">d8</option>
      <option value="6">d6</option>
      <option value="4">d4</option>
      <option value="3">d3</option>
      <option value="2">d2</option>
    </select>
    <p id="result${setCounter}"></p> 
  `;

  diceSets.appendChild(newSet);
}

function removeDiceSet() {
  const diceSets = document.getElementById("diceSets");
  const lastSet = diceSets.lastChild;
  if (lastSet) {
    diceSets.removeChild(lastSet);
  }
}

function damageRoll() {
  let overallTotal = 0;

  // Get all existing dice sets 
  const diceSets = document.querySelectorAll("#diceSets > div"); 

  for (let i = 0; i < diceSets.length; i++) { 
    const diceType = diceSets[i].querySelector("select");
    const quantityT = diceSets[i].querySelector("input[type='number']:first-of-type");
    const modifier = diceSets[i].querySelector("input[type='number']:nth-of-type(2)");
    const resultDisplay = diceSets[i].querySelector("p"); 

    let dice = diceType.value;
    let quantity = quantityT.value;
    let mod = modifier.value;
    let rolls = [];
    let total = 0;

    for (let j = 0; j < quantity; j++) {
      let roll = Math.floor(Math.random() * dice) + 1;
      rolls.push(roll);
      total += roll;
    }

    total += parseInt(mod); 

    if (total <= 0) { total = 1 } 

    resultDisplay.innerHTML = "Rolls: " + rolls.join(", ") + " Total: " + total;

    overallTotal += total;
  }

  document.getElementById("overallTotal").innerHTML = "Overall Total: " + overallTotal;
}

function resetCalculator() {
    // 1. Clear input fields
    for (let i = 1; i <= setCounter; i++) {
        document.getElementById("quantity" + i).value = 1;
        document.getElementById("modifier" + i).value = 0;
        // Reset dice type dropdowns if needed
    }

    // 2. Clear result displays
    for (let i = 1; i <= setCounter; i++) {
        document.getElementById("result" + i).innerHTML = "";
    }
    document.getElementById("overallTotal").innerHTML = "";

    // 3. (Optional) Reset setCounter to 1 
    while (setCounter > 1) {
        removeDiceSet(); // Use the removeDiceSet function from earlier
        setCounter--;
    } 
    updateSetCountDisplay(); 
}

// Initial setup on page load
updateSetCountDisplay();