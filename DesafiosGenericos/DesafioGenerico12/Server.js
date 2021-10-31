const express = require('express')
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const msgs = []

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root:__dirname})
    
})

io.on('connection', socket => {
    console.log('nuevo usuario')
    
    socket.emit('mensajes', msgs)
    
    socket.on('newMessage', msg =>{
        msgs.push({'socketID':socket.id, message:msg})
        socket.emit('mensajes', msgs)
    })
    
})


httpServer.listen(8080, ()=>{
    console.log('server On')
})
