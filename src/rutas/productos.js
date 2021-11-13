import express, {Router} from 'express'
import Contenedor from '../contenedores/contenedor.js'


const admin = true


export const contenedorProductos = new Contenedor('./src/contenedores/productos.txt') 


const productos = Router()


productos.use(express.urlencoded({extended: true}))
productos.use(express.static('public'))
productos.use(express.json())


productos.get('/', async (req, res) =>{
    res.json(await contenedorProductos.getAll())
})

productos.get('/:id', async (req, res) =>{
    const {id} = req.params;
    res.json(await contenedorProductos.getById(id))
})

productos.post('/',async (req, res) =>{
    if (admin){
        
        const producto = {
            timeStamp: Date.now(),
            nombre:req.body.nombre,
            descripcion: req.body.descripcion,
            codigo:req.body.codigo,
            foto:req.body.foto,
            precio:req.body.precio,
            stock:req.body.stock
        }
        console.log(producto)
        await contenedorProductos.save(producto).catch(err => res.sendStatus(500))
        res.sendStatus(200)
    }else{
        res.send('No eres Admin')
    }
})

productos.put('/:id', async (req, res) =>{
    if(admin){
        const {id} = req.params;
        const producto = {
            timeStamp: Date.now(),
            nombre:req.body.nombre,
            descripcion: req.body.descripcion,
            codigo:req.body.codigo,
            foto:req.body.foto,
            precio:req.body.precio,
            stock:req.body.stock
        }
        await contenedorProductos.editById(id, producto)
        .then(() => res.sendStatus(200))
        .catch((err) => res.sendStatus(500))
    }else{
        res.send('No eres Admin')
    }    
})

productos.delete('/:id', async (req, res) =>{
    if (admin){
        const {id} = req.params
        await contenedorProductos.deleteById(id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
    }else{
        res.send('No eres Admin')
    }
})



export default productos
