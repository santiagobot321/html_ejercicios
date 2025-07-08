const mostrando = document.getElementById("app")

export function login() {
    return mostrando.innerHTML = `
    <form>
        <label>Login</label>
        <input type="email" name="correo" id="emailogin">
        <input type="password" name="contraseña" id="contraseñalogin">
        <button type="submit">Send</button>
    </form>
    <div id="mensajerror"></div>
    `

    const formulario = document.querySelector("form")
    
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault()

        const email = document.getElementById("emailogin")
        const passwd = document.getElementById("contraseñalogin")

        if (!email || !passwd) {
            mensajerror.innerHTML = ""
            const mensaje = document.createElement("p")
            mensaje.textContent = "Todos los campos son obligatorios"
            mensajerror.appendChild(mensaje)
            return
        }

        try {
            await fetch('http://localhost:3000/usuarios', 
                
            )
        } catch (error) {
            console.error(error)
        }

    })


}

