import { error } from 'console'
import express from 'express'

const api = express()

const usuarios = [
    {id: 1, nombre: "Pepe", passwd: "asd123"},
    {id: 2, nombre: "Juan", passwd: "coco45"},
    {id: 3, nombre: "Maria", passwd: "energy56"},
    {id: 4, nombre: "Zeneca", passwd: "peras!"}
]

api.use(express.json())


// | GET    | `/api/users`     | Ver lista de usuarios              |
api.get('/api/users',(req,res) => {
    const nombres = usuarios.map(u => u.nombre)
    res.json({nombres})
})

// | GET    | `/api/users/:id` | Ver detalle de un usuario          |
api.get('/api/users/:iduser',(req,res) => {
    const nombreindividual = usuarios.find(u => u.id === parseInt(req.params.iduser))

    if (nombreindividual) {
        res.json({id: nombreindividual.id, nombre: nombreindividual.nombre})
    } else {
        res.status(404).json({error: "usuario no encontrado"})
    }
})

// | POST   | `/api/login`     | Iniciar sesión                     |
api.post('/api/login', (req,res) => {
    const { user, pass } = req.body
    if (!user.trim() || !pass.trim()) {
        return res.status(404).json({error:"No hay credenciales"})
    }

    const usuario = usuarios.find(u => u.nombre === user)

    if (!usuario) {
        res.status(404).json({
            error:"Usuario no encontrado"
        })
    }

    if (!(usuario.passwd === pass)) {
        return res.status(404).json({error: "Contraseña incorrecta"})
    }

    res.json({token:"fake-token-123",mensaje:"Bienvenido"})

})

// | DELETE | `/api/users/:id` | Eliminar usuario (acción sensible) |
api.delete('/api/users/:nombredel', (req,res) => {
    const usertodelete = usuarios.find(u => u.nombre === req.params.nombredel)

    if (!usertodelete) {
        return res.status(404).json({mensaje:"Usuario no encontrado"})
    }

    usuarios.splice(usuarios.indexOf(usertodelete), 1);

    res.json({ mensaje: "Usuario eliminado con éxito" });
})



api.listen(3000, () => {
    console.log("Running server on port http://localhost:3000")
})





// | Método | Ruta             | ¿Qué simula?                       |
// | ------ | ---------------- | ---------------------------------- |




// | GET    | `/api/config`    | Configuración oculta (trampa)      |
// | GET    | `/api/.env`      | Archivos internos (trampa)         |
