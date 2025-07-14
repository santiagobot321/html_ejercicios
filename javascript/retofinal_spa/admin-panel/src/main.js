import { validateLogin } from './utils/validation.js';
import { userAuth } from './services/auth.js';

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailogin").value.trim();
    const passwd = document.getElementById("passwdlogin").value.trim();

    const error = validateLogin(email, passwd);

    if (error) {
      if (!document.getElementById("error-msg")) {
        const p = document.createElement("p");
        p.id = "error-msg";
        p.textContent = error;
        p.style.color = "red";
        document.body.appendChild(p);
      }
      return;
    }

    const userExist = await userAuth(email,passwd)

    if (userExist) {
        localStorage.setItem("user", JSON.stringify(userExist))
        if (userExist.role === "admin") {
            window.location.href = "/src/pages/dashboard.html"
        } else {
            window.location.href = "/src/pages/public.html"
        }

    }

  });
}
