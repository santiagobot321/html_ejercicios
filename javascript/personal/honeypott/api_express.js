import express from 'express'
import fetch from "node-fetch"
import cors from 'cors'


// Creando el server con express
const api = express()

api.use(cors())

// Base de datos falsa
const usuarios = [
    {id: 1, nombre: "Pepe", passwd: "asd123"},
    {id: 2, nombre: "Juan", passwd: "coco45"},
    {id: 3, nombre: "Maria", passwd: "energy56"},
    {id: 4, nombre: "Zeneca", passwd: "peras!"}
]

api.use(express.json())


api.get('/api/mi-ip', async (req,res) => {
    try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({error:"IP no encontrada"})
    }
})


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
        res.status(404).json({error: "usuario no existe"})
    }
})

// | GET    | `/api/config`    | Configuración oculta (trampa)      |
api.get('/api/config', (req,res) => {
    res.json({
    db_host: "localhost",
    db_user: "admin",
    db_password: "admin1234",
    jwt_secret: "s3cr3tK3yH0n3y",
    smtp_server: "mail.fakecorp.local",
    smtp_pass: "emailPass!2023",
    internal_api_key: "sk_test_51JH0n3yP0tFAK3k3y",
    status: "operational",
    last_backup: "2024-07-03T23:21:00Z"
  });
})


// | GET    | `/api/.env`      | Archivos internos (trampa)         |
api.get('/api/.env',(req,res) => {
    res.type('text/plain').send(`DB_USER=admin\nDB_PASS=admin1234\nSECRET_KEY=honey123\nPORT=3000`)
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

// El server escucha por el puerto 3000
api.listen(3000, () => {
    console.log("Running server on port http://localhost:3000")
})

