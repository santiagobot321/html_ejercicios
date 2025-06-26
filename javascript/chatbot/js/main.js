import { ChatMessage } from "./mensajes.js";


const history = [];

// history.push(
//     new ChatMessage(this.autor, this.content)
// )

// history.forEach(mensaje => {
//     console.log(mensaje.showing())
// })

history.push(
    new ChatMessage("santiago", "hola esto es un mensaje"),
    new ChatMessage("bot", "Hola Santiago, ¿cómo puedo ayudarte?"),
    new ChatMessage("santiago", "¿Qué es una closure en JavaScript?")
);


function renderizarHistorial(historial) {
    const chatDiv = document.getElementById('chat');
    chatDiv.innerHTML = ''; // Limpiar el contenido antes de renderizar

    historial.forEach(msg => {
        const p = document.createElement('p');
        p.textContent = msg.showing();
        chatDiv.appendChild(p);
    });
}

renderizarHistorial(history);