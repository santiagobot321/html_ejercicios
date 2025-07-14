// GET ---> Traer los datos
fetch('http://localhost:3000/productos')
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    // Si algo falla
    console.error('Error:', error);
  });


const aggname = document.getElementById('aggname')
const aggprice = document.getElementById('aggprice')

// POST ---> ¿Para qué sirve? Guardar un nuevo usuario, producto, comentario, etc.

function AgregandoProducto () {

}

fetch('http://localhost:3000/productos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ "id": 3, "nombre": "coco", "precio":3500 })
})
  .then(res => res.json())
  .then(data => console.log('Usuario creado:', data));



// PUT ---> ¿Para qué sirve? Cambiar todos los datos de un usuario, por ejemplo.
fetch('http://localhost:3000/productos/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ id: 1, nombre: 'Nuevo Nombre' })
})
  .then(res => res.json())
  .then(data => console.log('Usuario actualizado:', data));


