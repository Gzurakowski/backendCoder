import express, {Router} from 'express'
import productDaoMongo from '../daos/productDaoMongo.js'
import productosDaoFS from '../daos/productosDaoFS.js'
import productsDaoFirebase from '../daos/productsDaoFirebase.js'

const admin = true

const daoMongo = new productDaoMongo();
const productosDao = new productosDaoFS()
const daoFirebase = new productsDaoFirebase()


const productos = Router()


productos.use(express.urlencoded({extended: true}))
productos.use(express.static('public'))
productos.use(express.json())




productos.get('/', async (req, res) =>{
    
    let productos
    try {
        productos = await productosDao.getAll()
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    let products
    try {
        products = await daoMongo.getAll()
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    let prods
    try {
        prods = await daoFirebase.getAllProducts()
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    res.status(200).json([productos, products, prods])
    
})

productos.get('/:id', async (req, res) =>{
    const {id} = req.params;
    
    let producto
    try {
        producto = await productosDao.getById(id)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    let product
    try {
        product = await daoMongo.getById(id)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    let prod
    try {
        prod = await daoFirebase.getById(id)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    res.status(200).json([producto, product])
    
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
        
        try {
            await productosDao.save(producto)
        
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
        
        try {
            await daoMongo.create(producto)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
        
        try {
            await daoFirebase.save(producto)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
        
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
        
        try {
            await productosDao.editById(id, producto)
        
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
        
        
        try {
            daoMongo.updateById(id, producto)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
        
        try {
            daoFirebase.updateById(id, producto)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }

        res.sendStatus(200)
    }else{
        res.send('No eres Admin')
    }    
})

productos.delete('/:id', async (req, res) =>{
    if (admin){
        const {id} = req.params
        
        try {
            await productosDao.deleteById(id)
        
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
        
        try {
            daoMongo.deleteById(id)
        
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
        
        try {
            daoFirebase.deleteById(id)
        
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
        
        res.sendStatus(200)
    }else{
        res.send('No eres Admin')
    }
})



export default productos
