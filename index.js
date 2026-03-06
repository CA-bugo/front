const content = document.querySelector("#content");
const form = document.querySelector("#productForm");

// POST API - handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission
  
  let itemName = document.querySelector("#itemName").value;
  let unitPrice = document.querySelector("#unitPrice").value;
  let quantity = document.querySelector("#quantity").value;
  let supplier = document.querySelector("#supplier").value;
  
  let formData = { itemName, unitPrice, quantity, supplier };

  fetch("https://kudigu.onrender.com/api/show", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((data) => {
      alert("Product Added Successfully");
      form.reset(); // Clear form instead of full page reload
      getUsers(); // Refresh the list
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to add product");
    });
});

window.addEventListener("load", () => {
  getUsers();
});

function getUsers() {
  let html = "";
  
  fetch("https://kudigu.onrender.com/api/show", { mode: "cors" })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (!Array.isArray(data)) {
        console.error("Expected array, got:", data);
        return;
      }
      data.forEach((element) => {
        html += `<li>${element.itemName} - $${element.unitPrice} - Qty: ${element.quantity} - ${element.supplier}</li>`;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      content.innerHTML = "<li>Error loading products</li>";
    });
}
