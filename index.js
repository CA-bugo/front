const content = document.querySelector("#content");
const submit = document.querySelector("#add");
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
        html += <li>{`${element.id} ${element.itemName} - ${element.unitPrice} - ${element.quantity} - ${element.supplier}`} </li>;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

//POST API
submit.addEventListener("click", () => {
  const product = {
    itemName: document.querySelector("#itemName").value,
    unitPrice: document.querySelector("#price").value,
    quantity: document.querySelector("#quantity").value,
    supplier: document.querySelector("#supplier").value,
  };
  fetch("https://kudigu.onrender.com/api/show", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  }).catch((error) => {
    console.log(error);
  });
  alert("Product added successfully");
  location.reload();
});


