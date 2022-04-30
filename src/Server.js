const express = require('express')
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io')
const {DB} = require('./contenedor.js')
const {faker} = require('@faker-js/faker')
require('dotenv').config()

const mySQLOptions = {
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user: process.env.DBuser,
        password: process.env.DBpassword,
        database: process.env.DBname
    },
    pool:{min:0, max:7}
}

const SQLiteOptions = {
    client:'sqlite3',
    connection: {filename: './ecommerce/DB.sqlite'}
}
const DBMensajes = new DB(mySQLOptions, 'mensajes')
const DBProductos = new DB(SQLiteOptions, 'productos')
DBMensajes.crearTabla()
DBProductos.crearTabla()

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/api/productos-test', async (req, res) => {
    const productos = []
    for(let i = 0; i < 5; i++){
        productos.push({titulo:faker.commerce.product(), foto:faker.image.business(50,50,true), precio: faker.commerce.price() }) 
    }
    res.json({productos:productos})
})




io.on('connection', async socket => {
    console.log('nuevo usuario')
    const Mensajes = await DBMensajes.getAll()
    const Productos = await DBProductos.getAll()
    socket.emit('mensajes', Mensajes)
    socket.emit('productos', Productos)
    
    
    socket.on('newMessage', async ({mail, mensaje}) =>{
        await DBMensajes.save({mail, mensaje})
        const Mensajes = await DBMensajes.getAll()
        io.emit('mensajes', Mensajes)
    })
    
    socket.on('newProduct', async producto => {
        await DBProductos.save(producto)
        const Productos = await DBProductos.getAll()
        io.emit('productos', Productos)
    })
    
})


httpServer.listen(3000, ()=>{
    console.log('server On')
})
