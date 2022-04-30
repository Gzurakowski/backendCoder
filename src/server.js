import express, {Router} from 'express'
//const multer = require('multer')

import "./config.js"
import productos from './rutas/productos.js'
import carrito from './rutas/carrito.js'


const app = express()


app.use('/api/productos', productos)
app.use('/api/carrito', carrito)

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())


// /* ------------------------------------------------------ */

// const storage = multer.diskStorage({
//     destination: ( req, file, cb) =>{
//         cb(null,'uploads')
//     },
//     filename: ( req, file, cb) =>{
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage })


// /* ------------------------------------------------------ */







/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor error`))