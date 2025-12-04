let orders = JSON.parse(localStorage.getItem("orders")) || [];

document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let id = document.getElementById("orderId").value;

    let order = {
        id: id ? Number(id) : Date.now(),
        name: document.getElementById("customerName").value,
        cloth: document.getElementById("clothType").value,
        measurement: document.getElementById("measurement").value,
        date: document.getElementById("deliveryDate").value
    };

    if (id) {
        // Update existing order
        orders = orders.map(o => o.id === Number(id) ? order : o);
        document.getElementById("submitBtn").innerText = "Add Order";
    } else {
        // Add new order
        orders.push(order);
    }

    localStorage.setItem("orders", JSON.stringify(orders));
    this.reset();
    document.getElementById("orderId").value = "";
    displayOrders();
});

// VIEW (Read)
function displayOrders() {
    let table = document.getElementById("orderTable");
    table.innerHTML = "";

    orders.forEach(order => {
        let row = `
        <tr>
            <td>${order.name}</td>
            <td>${order.cloth}</td>
            <td>${order.measurement}</td>
            <td>${order.date}</td>
            <td>
                <button class="edit" onclick="editOrder(${order.id})">Edit</button>
                <button class="delete" onclick="deleteOrder(${order.id})">Delete</button>
            </td>
        </tr>
        `;
        table.innerHTML += row;
    });
}

// DELETE
function deleteOrder(id) {
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem("orders", JSON.stringify(orders));
    displayOrders();
}

// UPDATE (load data)
function editOrder(id) {
    let order = orders.find(o => o.id === id);

    document.getElementById("orderId").value = order.id;
    document.getElementById("customerName").value = order.name;
    document.getElementById("clothType").value = order.cloth;
    document.getElementById("measurement").value = order.measurement;
    document.getElementById("deliveryDate").value = order.date;

    document.getElementById("submitBtn").innerText = "Update Order";
}

displayOrders();
