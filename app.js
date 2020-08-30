const Server = require('./server')
const server = new Server()

server.configurations()

server.routes()

server.start()