let users = JSON.parse(localStorage.getItem("users")) || [];

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let earnings = JSON.parse(localStorage.getItem("earnings")) || 0;

function save() {

    localStorage.setItem("users",
        JSON.stringify(users));

    localStorage.setItem("orders",
        JSON.stringify(orders));

    localStorage.setItem("earnings",
        earnings);

}

function openPage(p) {

    window.location = p;

}

function registerCustomer() {

    users.push({

        name: cname.value,

        phone: cphone.value,

        password: cpassword.value,

        role: "customer"

    });

    save();

    openPage("login.html");

}

function registerDriver() {

    users.push({

        name: dname.value,

        phone: dphone.value,

        vehicle: vehicle.value,

        number: vnumber.value,

        password: dpassword.value,

        role: "driver",

        available: false

    });

    save();

    openPage("login.html");

}

function login() {

    let p = phone.value;

    let pass = password.value;

    if (p == "0000" && pass == "admin") {

        openPage("admin.html");

        return;

    }

    for (let u of users) {

        if (u.phone == p && u.password == pass) {

            localStorage.setItem("active",
                JSON.stringify(u));

            if (u.role == "customer")

                openPage("customer_dashboard.html");

            else

                openPage("driver_dashboard.html");

            return;

        }

    }

    alert("Wrong login");

}

function createOrder() {

    orders.push({

        pickup: pickup.value,

        drop: drop.value,

        cargo: cargo.value,

        payment: payment.value,

        status: "Pending"

    });

    save();

    alert("Order sent");

}

function loadOrders() {

    let box = document.getElementById(
        "orders");

    if (!box) return;

    box.innerHTML = "";

    for (let i = 0; i < orders.length; i++) {

        box.innerHTML += `

<div class=orderCard>

<p>${orders[i].pickup}</p>

<p>${orders[i].drop}</p>

<p>${orders[i].cargo}</p>

<p>${orders[i].payment}</p>

<p>${orders[i].status}</p>

<button onclick="accept(${i})">

Accept

</button>

<button onclick="complete(${i})">

Complete

</button>

</div>

`;

    }

}

function accept(i) {

    orders[i].status = "Accepted";

    save();

    loadOrders();

}

function complete(i) {

    orders[i].status = "Completed";

    earnings += 50;

    save();

    loadOrders();

    let m = document.getElementById("money");

    if (m) m.innerHTML = earnings;

}

function loadAdmin() {

    let u = document.getElementById("users");

    let o = document.getElementById(
        "ordersAdmin");

    let e = document.getElementById(
        "earnings");

    if (u) {

        u.innerHTML = "";

        for (let x of users) {

            u.innerHTML += `

<div class=orderCard>

<p>${x.name}</p>

<p>${x.role}</p>

</div>`;

        }

    }

    if (o) {

        o.innerHTML = "";

        for (let y of orders) {

            o.innerHTML += `

<div class=orderCard>

<p>${y.pickup}</p>

<p>${y.status}</p>

</div>`;

        }

    }

    if (e) {

        e.innerHTML = earnings;

    }

}

function loadHistory() {

    let h = document.getElementById(
        "history");

    if (!h) return;

    h.innerHTML = "";

    for (let z of orders) {

        h.innerHTML += `

<div class=orderCard>

<p>${z.pickup}</p>

<p>${z.status}</p>

</div>`;

    }

}

function logout() {

    localStorage.removeItem("active");

    openPage("index.html");

}

loadOrders();

loadAdmin();

loadHistory();