const content = document.querySelector("#content");
const submit = document.querySelector("#add");

//POST API
submit.addEventListener("click", () => {
  let iname = document.querySelector("#itemName").value;
  let uprice = document.querySelector("#unitPrice").value;
  let quan = document.querySelector("#quantity").value;
  let sup = document.querySelector("#supplier").value;
  let formData = { iname, uprice, quan, sup };

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
        html += <li> ${element.itemName} ${element.unitPrice} ${element.quantity} ${element.supplier}</li>;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}
