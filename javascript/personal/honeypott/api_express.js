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



api.get('/api/users',(req,res) => {
    const nombres = usuarios.map(u => u.nombre)
    res.json({nombres})
})

api.get('/api/users/:iduser',(req,res) => {
    const nombreindividual = usuarios.find(u => u.id === parseInt(req.params.iduser))

    if (nombreindividual) {
        res.json({id: nombreindividual.id, nombre: nombreindividual.nombre})
    } else {
        res.status(404).json({error: "usuario no encontrado"})
    }
})

api.post('/api/login', (req,res) => {
    const { user, pass} = req.body
    if (!user || !pass) {
        res.status(404).json({error:"No hay credenciales"})
    }

    
})



api.listen(3000, () => {
    console.log("Running server on port http://localhost:3000")
})