const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
  window.location.href = "/index.html";
} else {
  document.querySelector("h1").textContent = `Welcome Admin`;
  loadDashboard();
}

async function loadDashboard() {
  const userContainer = document.getElementById("users-list");
  const eventContainer = document.getElementById("events-list");
  userContainer.innerHTML = "";
  eventContainer.innerHTML = "";

  const users = await fetch("http://localhost:3000/users").then(res => res.json());
  const events = await fetch("http://localhost:3000/events").then(res => res.json());

  users.forEach(user => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${user.name} (${user.email}) - ${user.role}</p>
      <button class="delete-user" data-id="${user.id}">Delete</button>
      <button class="edit-user" data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">Edit</button>
    `;
    userContainer.appendChild(div);
  });

  events.forEach(event => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${event.title}</h2>  
      <h3>${event.description}</h3> 
      <p>Start Date: ${event.startDate}</p> 
      <p>Capacity: ${event.capacity}</p>
      <button class="delete-event" data-id="${event.id}">Delete</button>
      <button class="edit-event" data-id="${event.id}" data-title="${event.title}" data-description="${event.description}">Edit</button>
    `;
    eventContainer.appendChild(div);
  });

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll(".delete-user").forEach(btn => {
    btn.addEventListener("click", () => deleteUser(btn.dataset.id));
  });

  document.querySelectorAll(".edit-user").forEach(btn => {
    btn.addEventListener("click", () => editUser(btn.dataset.id, btn.dataset.name, btn.dataset.email));
  });

  document.querySelectorAll(".delete-event").forEach(btn => {
    btn.addEventListener("click", () => deleteEvent(btn.dataset.id));
  });

  document.querySelectorAll(".edit-event").forEach(btn => {
    btn.addEventListener("click", () => editEvent(btn.dataset.id, btn.dataset.title, btn.dataset.description));
  });
}

// Formulario para crear usuario
const userForm = document.getElementById("create-user-form");
if (userForm) {
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("newName").value;
    const email = document.getElementById("newEmail").value;
    const role = document.getElementById("newRole").value;

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role })
    });

    userForm.reset();
    loadDashboard();
  });
}

// Formulario para crear curso
const courseForm = document.getElementById("create-event-form");
if (courseForm) {
  courseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("newTitle").value;
    const description = document.getElementById("newDescription").value;
    const date = document.getElementById("newDate").value
    const capacity = document.getElementById("newCapacity").value

    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description,date,capacity })
    });

    courseForm.reset();
    loadDashboard();
  });
}

async function deleteUser(id) {
  await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
  loadDashboard();
}

async function deleteEvent(id) {
  await fetch(`http://localhost:3000/events/${id}`, { method: "DELETE" });
  loadDashboard();
}

function editUser(id, currentName, currentEmail) {
  const name = prompt("New name:", currentName);
  const email = prompt("New email:", currentEmail);
  if (name && email) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    }).then(() => loadDashboard());
  }
}

function editEvent(id, currentTitle, currentDescription,currentDate,currentCapacity) {
  const title = prompt("New title:", currentTitle);
  const description = prompt("New description:", currentDescription);
  const date = prompt("New date", currentDate)
  const capacity = prompt("New capacity", currentCapacity)
  if (title && description && date && capacity) {
    fetch(`http://localhost:3000/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, date, capacity })
    }).then(() => loadDashboard());
  }
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/index.html";
});