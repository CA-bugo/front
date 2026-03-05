const content = document.querySelector("#content");
const submit = document.querySelector("#add");

//POST API
submit.addEventListener("click", () => {
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
  }).catch((error) => {
    console.log(error);
  });
  alert("Product Added Successfully");
  location.reload();
});

window.addEventListener("load", () => {
  getUsers();
});


function getUsers() {
  let html = "";
  //FETCH API
  fetch("https://kudigu.onrender.com/api/show", { mode: "cors" })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        html += 
    <li> 
        <span class="item-name">${element.itemName}</span>
        <div class="item-meta">
            <span class="item-price">₱${element.unitPrice}</span> • 
            <span>Qty: ${element.quantity}</span>
        </div>
        <div class="item-meta" style="font-size: 0.75rem; opacity: 0.7;">
            Supplier: ${element.supplier}
        </div>
    </li>;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}
