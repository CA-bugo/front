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
        html += `<li>${element.id} ${element.itemName} - ${element.unitPrice} - ${element.quantity} - ${element.supplier} </li>`;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

submit.addEventListener("click", () => {
  let iname = document.querySelector("#pname").value;
  let uprice = document.querySelector("#p").value;
  let quan = document.querySelector("#q").value;
  let supplier = document.querySelector("#s").value;
  let formData = { iname, uprice, quan, supplier };

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

