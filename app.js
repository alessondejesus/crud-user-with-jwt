const Server = require('./server')
const server = new Server()

server.config()

server.routes()

server.start()