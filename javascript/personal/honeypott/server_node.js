// Comenzamos importando express para poder hacer el servidor
import express from 'express'

// Acá declaramos un objeto express con todas sus funcionalidades
const server = express()

// Abrimos el servidor
server.express()

// 
class usuarios {
    constructor(id,name,email,passwd) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwd = passwd;
    }
}



server.get('/server/usuarios',(req,res) =>{

})






server.listen(3000,() => {
    console.log(`Server is listening on port 3000`)
})

