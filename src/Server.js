const express = require('express')
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io')
const fs = require('fs')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const mensajes = []
const productos = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

class Contenedor {
    constructor(archivo){
        this.id = 0
        this.archivo = archivo;
    }
    async save(data){
        data.id = this.id
        await fs.promises.readFile(this.archivo,'utf-8')
        .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
        .then(arch => {
            if (arch.length != 0){
                data.id = arch[arch.length - 1].id + 1;
                this.id = data.id;
            }
            arch.push(data);
            return arch;
        })// si hay un array de objetos agrega el nuevo objeto
        .then(arch => {
            fs.promises.writeFile(this.archivo, JSON.stringify(arch)).catch(error =>console.log(error))
        })// y vuelve a escribir el archivo
        .catch(error => {
            console.log(error);
            fs.promises.writeFile(this.archivo, JSON.stringify([data])).catch(err => console.log(err));
            console.log('se creo el archivo')
            this.id = null;        
        })
        return this.id;
    }

    
    async getAll(){
        return await fs.promises.readFile(this.archivo,'utf-8')
        .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
        .catch(error => console.log(error))
    }
    
}

const Datos = new Contenedor('Mensajes.txt')

io.on('connection', async socket => {
    console.log('nuevo usuario')
    const Mensajes = await Datos.getAll()
    
    socket.emit('mensajes', Mensajes)
    socket.emit('productos', productos)
    
    
    socket.on('newMessage', async ({mail, mensaje, fecha}) =>{
        await Datos.save({mail, mensaje, fecha})
        io.emit('mensajes', await Datos.getAll())
    })
    
    socket.on('newProduct', producto => {
        productos.push(producto)
        io.emit('productos', productos)
    })
    
})


httpServer.listen(8080, ()=>{
    console.log('server On')
})
