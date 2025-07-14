// dashboard.js limpio y moderno usando addEventListener

const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
  window.location.href = "/index.html";
} else {
  document.querySelector("h1").textContent = `Welcome Admin, ${user.name}`;
  loadDashboard();
}

async function loadDashboard() {
  const userContainer = document.getElementById("users-list");
  const courseContainer = document.getElementById("courses-list");
  userContainer.innerHTML = "";
  courseContainer.innerHTML = "";

  const users = await fetch("http://localhost:3000/users").then(res => res.json());
  const courses = await fetch("http://localhost:3000/courses").then(res => res.json());

  users.forEach(user => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${user.name} (${user.email}) - ${user.role}</p>
      <button class="delete-user" data-id="${user.id}">Delete</button>
      <button class="edit-user" data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">Edit</button>
    `;
    userContainer.appendChild(div);
  });

  courses.forEach(course => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${course.title} - ${course.description}</p>
      <button class="delete-course" data-id="${course.id}">Delete</button>
      <button class="edit-course" data-id="${course.id}" data-title="${course.title}" data-description="${course.description}">Edit</button>
    `;
    courseContainer.appendChild(div);
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

  document.querySelectorAll(".delete-course").forEach(btn => {
    btn.addEventListener("click", () => deleteCourse(btn.dataset.id));
  });

  document.querySelectorAll(".edit-course").forEach(btn => {
    btn.addEventListener("click", () => editCourse(btn.dataset.id, btn.dataset.title, btn.dataset.description));
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
const courseForm = document.getElementById("create-course-form");
if (courseForm) {
  courseForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("newTitle").value;
    const description = document.getElementById("newDescription").value;

    await fetch("http://localhost:3000/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });

    courseForm.reset();
    loadDashboard();
  });
}

async function deleteUser(id) {
  await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
  loadDashboard();
}

async function deleteCourse(id) {
  await fetch(`http://localhost:3000/courses/${id}`, { method: "DELETE" });
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

function editCourse(id, currentTitle, currentDescription) {
  const title = prompt("New title:", currentTitle);
  const description = prompt("New description:", currentDescription);
  if (title && description) {
    fetch(`http://localhost:3000/courses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    }).then(() => loadDashboard());
  }
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/index.html";
});
