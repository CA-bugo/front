const content = document.querySelector("#content");
const form = document.querySelector("#productForm");

// POST API - handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Match backend expected field names
  let name = document.querySelector("#itemName").value;
  let price = document.querySelector("#unitPrice").value;
  let quantity = document.querySelector("#quantity").value;
  let supplier = document.querySelector("#supplier").value;
  
  // Backend expects: { name, price, quantity, supplier }
  let formData = { name, price, quantity, supplier };

  fetch("https://kudigu.onrender.com/api/show", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((data) => {
      alert("Product Added Successfully");
      form.reset();
      getUsers(); // Refresh list
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
        // Match your database column names
        html += `<li>${element.itemName} - $${element.unitPrice} - Qty: ${element.quantity} - ${element.supplier}</li>`;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      content.innerHTML = "<li>Error loading products</li>";
    });
}
