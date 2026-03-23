const content = document.querySelector("#content");
const submit = document.querySelector("#add");
const update = document.querySelector("#upt");
const recordCount = document.querySelector("#recordCount");
const ID = document.querySelector("#ID");
const fname = document.querySelector("#fname");
const pday = document.querySelector("#pday");
const wday = document.querySelector("#wday");
const total = document.querySelector("#total");

// AUTO calculate total
pday.addEventListener("input", calculateTotal);
wday.addEventListener("input", calculateTotal);

function calculateTotal() {
    let p = parseFloat(pday.value);
    let w = parseFloat(wday.value);

    if (!isNaN(p) && !isNaN(w)) {
        total.value = (p * w).toFixed(2);
    } else {
        total.value = "";
    }
}

function resetForm() {
    fname.value = '';
    pday.value = '';
    wday.value = '';
    total.value = '';
    ID.value = '';
    update.disabled = true;
    submit.disabled = false;
}

function validateForm() {
    if (!fname.value.trim()) {
        alert('Please enter full name');
        fname.focus();
        return false;
    }
    if (parseFloat(pday.value) <= 0 || isNaN(parseFloat(pday.value))) {
        alert('Please enter valid rate per day > 0');
        pday.focus();
        return false;
    }
    if (parseInt(wday.value) <= 0 || isNaN(parseInt(wday.value))) {
        alert('Please enter valid working days > 0');
        wday.focus();
        return false;
    }
    return true;
}

// POST
submit.addEventListener("click", () => {
    let formData = {
        fname: fname.value,
        pday: pday.value,
        wday: wday.value
    };

    if (!validateForm()) return;

    fetch("https://semisexamnato.onrender.com/api/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
    })
    .then(() => {
        alert("Employee Added Successfully");
        resetForm();
        getEmployees();
    })
    .catch(err => {
        console.error(err);
        alert("Error adding employee");
    });
});

// UPDATE
update.addEventListener("click", () => {
    let formData = {
        id: ID.value,
        fname: fname.value,
        pday: pday.value,
        wday: wday.value
    };

    if (!validateForm()) return;

    if (confirm("Are you sure you want to update this employee?")) {
        fetch("https://semisexamnato.onrender.com/api/users", {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            if (!res.ok) throw new Error(res.status);
            return res.json();
        })
        .then(() => {
            alert("Employee Updated Successfully");
            resetForm();
            getEmployees();
        })
        .catch(err => {
            console.error(err);
            alert("Error updating employee");
        });
    }
});

window.addEventListener("load", () => {
    getEmployees();
});

function getEmployees() {
    let html = "";

    fetch('https://semisexamnato.onrender.com/api/users')
    .then(res => res.json())
    .then(data => {
        recordCount.textContent = `${data.length} records`;

        data.forEach(element => {
            html += `
            <tr>
                <td class="ps-4">${element.id}</td>
                <td>${element.fname}</td>
                <td class="text-end">₱${(parseFloat(element.pday) || 0).toLocaleString()}</td>
                <td class="text-end">${element.wday}</td>
                <td class="text-end fw-bold text-success">₱${(parseFloat(element.total) || 0).toLocaleString()}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-warning me-2" onclick="editEmployee(${element.id})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteEmployee(${element.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
        });

        content.innerHTML = html;
    })
    .catch(err => {
        console.error(err);
        recordCount.textContent = "0 records";
    });
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        fetch('https://semisexamnato.onrender.com/api/users', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => {
            if (!res.ok) throw new Error(res.status);
            return res.json();
        })
        .then(() => {
            alert("Employee Deleted Successfully");
            getEmployees();
        })
        .catch(err => {
            console.error(err);
            alert("Error deleting employee");
        });
    }
}

function editEmployee(id) {
    fetch(`https://semisexamnato.onrender.com/api/users/${id}`)
    .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
    })
    .then(data => {
        fname.value = data[0].fname;
        pday.value = data[0].pday;
        wday.value = data[0].wday;
        total.value = data[0].total;
        ID.value = data[0].id;

        update.disabled = false;
        submit.disabled = true;
    })
    .catch(err => {
        console.error(err);
        alert("Error loading employee");
    });
}
