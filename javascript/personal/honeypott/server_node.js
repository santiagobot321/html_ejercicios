import http from 'http'

const server = http.createServer((request, response) => {
    console.log("Server is running")
    response.writeHead(200, {'content-type': "application/json"})
    response.end(JSON.stringify({message: "Hola desde mi honeypott"}))
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})

