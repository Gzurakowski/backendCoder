import express, {Router} from 'express'
import { contenedorProductos } from './productos.js'
import Contenedor from '../contenedores/contenedor.js'



const carritos = new Contenedor('./src/contenedores/carritos.txt')


const carrito = Router()

carrito.use(express.urlencoded({extended: true}))
carrito.use(express.static('public'))
carrito.use(express.json())

carrito.post('/', async (req, res) =>{
    const carrito = {
        timeStamp: Date.now(),
        productos:[],
    }
    const id = await carritos.save(carrito)
    console.log(id)
    res.json(id)
})

carrito.delete('/:id',async (req, res) =>{
    const {id} = req.params
    await carritos.deleteById(id)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
    
})

carrito.get('/:id/productos', async (req,res) =>{
    const {id} = req.params
    
    const carrito = await carritos.getById(id)
    res.json(carrito.productos)
})

carrito.post('/:id/productos', async (req, res) =>{
    const id_prod = req.body.id
    const producto = await contenedorProductos.getById(id_prod)
    const {id} = req.params
    const carrito = await carritos.getById(id)
    carrito.productos.push(producto)
    await carritos.editById(id, carrito)
    .then(()=>res.sendStatus(200))
    .catch(()=>res.sendStatus(500))
})

carrito.delete('/:id/productos/:id_prod' , async (req, res) =>{
    const {id, id_prod} = req.params
    const carrito = await carritos.getById(id)
    await carritos.editById(id, carrito)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
})


export default carrito