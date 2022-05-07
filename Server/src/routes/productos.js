import {Router} from 'express'
import auth from '../middlewares/auth.js'
import ProductosDao from '../daos/productosDao.js'

const productosDao = new ProductosDao()

const productos = Router()

productos.use(auth)

productos.get('/', async (req, res) => {
    try{
        const productos = await productosDao.getAll()
        res.status(200).json({productos:productos})
    }catch(err){
        res.status(500).send("Error obteniendo productos")
    }
})

productos.post('/', async (req, res) => {
    try{
        const prod = req.body.data
        console.log(prod)
        await productosDao.save(prod)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.status(500).send("Error guardando producto")
    }
})

export default productos