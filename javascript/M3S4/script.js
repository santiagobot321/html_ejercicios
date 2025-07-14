// Mostrar datos cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
  mostrarDatos();
  contarInteraccion();
});

// Guardar datos cuando se envía el formulario
document.getElementById('userForm').addEventListener('submit', function(evento) {
  evento.preventDefault();

  var nombre = document.getElementById('name').value;
  var edad = document.getElementById('age').value;

  if (nombre === '' || edad === '') {
    alert('Por favor, escribe tu nombre y edad.');
    return;
  }

  localStorage.setItem('nombre', nombre);
  localStorage.setItem('edad', edad);

  mostrarDatos();
});

// Botón para limpiar datos
document.getElementById('clearBtn').addEventListener('click', function() {
  localStorage.clear();
  mostrarDatos();
});

// Función para mostrar los datos en pantalla
function mostrarDatos() {
  var nombreGuardado = localStorage.getItem('nombre');
  var edadGuardada = localStorage.getItem('edad');
  var output = document.getElementById('output');

  if (nombreGuardado && edadGuardada) {
    output.innerHTML = 'Nombre: ' + nombreGuardado + '<br>Edad: ' + edadGuardada;
  } else {
    output.innerHTML = 'No hay información almacenada.';
  }
}

// Función para contar las interacciones con la página
function contarInteraccion() {
  var contador = sessionStorage.getItem('contador');

  if (contador === null) {
    contador = 1;
  } else {
    contador = Number(contador) + 1;
  }

  sessionStorage.setItem('contador', contador);
  document.getElementById('counter').innerText = contador;
}
