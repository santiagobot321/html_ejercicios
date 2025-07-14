// URL base del servidor JSON Server
const API_URL = 'http://localhost:3000/productos';

// Referencias a elementos del DOM
const tabla = document.getElementById('tablaProductos');
const form = document.getElementById('productoForm');
const nombre = document.getElementById('nombre');
const categoria = document.getElementById('categoria');
const precio = document.getElementById('precio');

// Guarda el comportamiento original del formulario (crear producto)
const defaultSubmit = form.onsubmit;

// Carga los productos desde el servidor y los muestra en la tabla
async function cargarProductos() {
  tabla.innerHTML = ''; // Limpia la tabla

  try {
    const res = await fetch(API_URL); // GET productos
    if (!res.ok) throw new Error('Error al cargar productos');

    const productos = await res.json(); // Parsear JSON

    // Crear una fila por cada producto
    productos.forEach(p => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>$${p.precio}</td>
        <td>
            <button onclick="eliminarProducto('${p.id}')">🗑️</button>
            <button onclick="editarProducto('${p.id}', '${p.nombre}', '${p.categoria}', ${p.precio})">✏️</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  } catch (error) {
    alert(error.message);
  }
}

// Maneja el envío del formulario para crear un nuevo producto
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevoProducto = {
    nombre: nombre.value,
    categoria: categoria.value,
    precio: parseFloat(precio.value)
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    });

    if (!res.ok) throw new Error('Error al agregar producto');

    form.reset(); // Limpia el formulario
    cargarProductos(); // Recarga los datos
  } catch (error) {
    alert(error.message);
  }
});

// Elimina un producto por ID con confirmación
async function eliminarProducto(id) {
  if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar');
    cargarProductos();
  } catch (error) {
    alert(error.message);
  }
}

// Prepara el formulario para editar un producto específico
function editarProducto(id, nombreP, categoriaP, precioP) {
  nombre.value = nombreP;
  categoria.value = categoriaP;
  precio.value = precioP;

  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.value,
          categoria: categoria.value,
          precio: parseFloat(precio.value)
        })
      });

      if (!res.ok) throw new Error('Error al actualizar producto');

      form.reset();
      form.onsubmit = defaultSubmit; // Restaura el comportamiento original
      cargarProductos();
    } catch (error) {
      alert(error.message);
    }
  };
}

// Botón para consultar una API externa
document.getElementById('consultarApiBtn').addEventListener('click', consultarAPIExterna);

// Hace una solicitud GET a una API pública y muestra el resultado
async function consultarAPIExterna() {
  const box = document.getElementById('apiResultado');
  box.innerHTML = ''; // Limpia contenido anterior

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!res.ok) throw new Error('Error al consultar API externa');

    const data = await res.json();

    box.innerHTML = `
      <h3>📡 Post Externo</h3>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Título:</strong> ${data.title}</p>
      <p><strong>Contenido:</strong> ${data.body}</p>
    `;
  } catch (error) {
    box.innerHTML = `<p class="error">❌ ${error.message}</p>`;
  }
}

// Carga los productos al iniciar la página
cargarProductos();
