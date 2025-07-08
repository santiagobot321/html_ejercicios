const mostrando = document.getElementById("app")


export function registrando() {
    return mostrando.innerHTML = `
    <form>
        <label>Register form</label>
        <input id="nameregis" type="text" name="nombre" placeholder="Write your name"></input>
        <input id="emailregis" type="email" name="correo" placeholder="Write your email"></input>
        <input id="passwdregis" type="password" name="contrasena" placeholder="Write your password"></input>
        <select id="selectregis" name="select">
            <option value="visitor">Visitor</option>
            <option value="admin">Admin</option>
        </select>
        <button type="submit">Send</button>
    </form>
    <div id="mensajerror"></div>
    `

    const formulario = document.querySelector("form")

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault()
        const name = document.getElementById("nameregis").value
        const email = document.getElementById("emailregis").value
        const passwd = document.getElementById("passwdregis").value
        const select = document.getElementById("selectregis").value

        if (!name || !email || !passwd || !select) {
            mensajerror.innerHTML = ""
            const mensaje = document.createElement("p")
            mensaje.textContent = "Todos los campos son obligatorios"
            mensajerror.appendChild(mensaje)
            return

        }

        try {
            await fetch('http://localhost:3000/usuarios', {
                method: "POST",
                headers : {
                    "Content-Type": "application/json" 
                },
                body : JSON.stringify({nombre : name, correo : email, contraseña: passwd, rol: select})
            })
            mensajerror.innerHTML = ""
            const mensaje = document.createElement("p")
            mensaje.textContent = "Usuario agregado con exito"
            mensajerror.appendChild(mensaje)

        } catch (error) {
            console.log(error)
        }


    })
}