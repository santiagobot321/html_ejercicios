const user = JSON.parse(localStorage.getItem("user"));

async function loadCourses() {
  document.getElementById("username").innerHTML = `Welcome, ${user.name}`;

  const enrollments = await fetch('http://localhost:3000/enrollments')
    .then(res => res.json())
    .then(data => data.filter(enrollment => Number(enrollment.userId) === Number(user.id)));

  const allCourses = await fetch("http://localhost:3000/courses")
    .then(res => res.json());

  const enrolledCourses = allCourses.filter(curso =>
    enrollments.some(inscripcion => Number(inscripcion.courseId) === Number(curso.id))
  );

  const availableCourses = allCourses.filter(course =>
    !enrollments.some(enroll => Number(enroll.courseId) === Number(course.id))
  );

  const courseList = document.getElementById("courses");
  const availableList = document.getElementById("available-courses");

  // Mostrar cursos inscritos
  if (enrolledCourses.length > 0) {
    const title = document.createElement("h2");
    title.textContent = "Your enrolled courses:";
    courseList.appendChild(title);

    enrolledCourses.forEach(curso => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${curso.title}</h3>
        <p>${curso.description}</p>
      `;
      courseList.appendChild(div);
    });
  }

  // Mostrar cursos disponibles con botón de registro
  if (availableCourses.length > 0) {
    const title = document.createElement("h2");
    title.textContent = "Courses available to enroll:";
    availableList.appendChild(title);

    availableCourses.forEach(curso => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${curso.title}</h3>
        <p>${curso.description}</p>
        <button class="register-btn" data-id="${curso.id}">Register</button>
      `;
      availableList.appendChild(div);
    });

    // Agregar evento a cada botón "Register"
    document.querySelectorAll(".register-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const courseId = Number(e.target.dataset.id);

        await fetch("http://localhost:3000/enrollments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            courseId: courseId
          })
        });

        alert("Registered successfully!");
        window.location.reload(); // Recarga para actualizar lista
      });
    });
  }
}

// Botón logout
document.getElementById("Logout").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/index.html";
});

if (user) {
  loadCourses();
} else {
  window.location.href = "/index.html";
}
