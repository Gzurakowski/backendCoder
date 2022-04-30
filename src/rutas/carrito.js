import express, {Router} from 'express'
import cartDaoMongo from '../daos/cartDaoMongo.js'
import productDaoMongo from '../daos/productDaoMongo.js'
import carritoDaoFS from '../daos/carritoDaoFS.js'
import productosDaoFS from '../daos/productosDaoFS.js'
import productsDaoFirebase from '../daos/productsDaoFirebase.js'
import cartDaoFirebase from '../daos/cartDaoFirebase.js'


const cartDao = new cartDaoMongo()
const prodDao = new productDaoMongo()
const carritoDao = new carritoDaoFS()
const productosDao = new productosDaoFS()
const cartsDaoFirebase = new cartDaoFirebase()
const prodDaoFirebase = new productsDaoFirebase()



const carrito = Router()

carrito.use(express.urlencoded({extended: true}))
carrito.use(express.static('public'))
carrito.use(express.json())

carrito.post('/', async (req, res) =>{
    const carrito = {
        timeStamp: Date.now(),
        productos:[],
    }
    
    //FS Dao
    let idFS
    try{
        idFS = await carritoDao.save(carrito)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    
    
    //Mongo Dao
    let cart
    try{
        cart = await cartDao.create(carrito)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    
    let cartF
    try{
        cartF = await cartDaoFirebase.save(carrito)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    
    
    res.status(200).json([idFS, cart.id, cartF.id])
})

carrito.delete('/:id',async (req, res) =>{
    const {id} = req.params
    
    //FS DAO
    try {
        await carritoDao.deleteById(id)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    //Mongo Dao
    try {
        await cartDao.deleteById(id)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    try {
        await cartDaoFirebase.deleteById(id)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    res.sendStatus(200)
    
})

carrito.get('/:id/productos', async (req,res) =>{
    const {id} = req.params
    let carrito
    try {
        carrito = await carritoDao.getById(id)
        
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    let cart
    try {
        cart = await cartDao.getCartById(id)
        
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    let cartF
    try {
        cartF = await cartDaoFirebase.getById(id)
        
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    res.json([carrito.productos, cart.products])
})

carrito.post('/:id/productos', async (req, res) =>{
    const id_prod = req.body.id
    const {id} = req.params
    try {
        const producto = await productosDao.getById(id_prod)
        const carrito = await carritoDao.getById(id)
        carrito.productos.push(producto)
        await carritoDao.editById(id, carrito)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    try {
        const prod = await prodDao.getById(id_prod)
        const cart = await cartDao.getCartById(id)
        cart.products.push(prod._id)
        await cartDao.updateById(id, cart)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    try {
        const prod = await prodDaoFirebase.getById(id_prod)
        const cart = await cartsDaoFirebase.getCartById(id)
        cart.products.push(prod)
        await cartDao.updateById(id, cart)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    
    
    res.sendStatus(200)
})

carrito.delete('/:id/productos/:id_prod' , async (req, res) =>{
    const {id, id_prod} = req.params
    
    try {
        const carrito = await carritoDao.getById(id)
        carrito.productos = carrito.productos.filter(prod => prod.id != id_prod)
        await carritoDao.editById(id, carrito)
        
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    try {
        const cart = await cartDao.getCartById(id)
        cart.products = cart.products.filter(prod => prod.id != id_prod)
        await cartDao.updateById(id, cart)
        
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    try {
        const cart = await cartsDaoFirebase.getCartById(id)
        cart.products = cart.products.filter(prod => prod.id != id_prod)
        await cartDao.updateById(id, cart)
        
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
    res.sendStatus(200)
})


export default carrito