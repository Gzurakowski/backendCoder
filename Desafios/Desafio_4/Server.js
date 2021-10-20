const express = require('express')
const multer = require('multer')
const {routerProductos} = require('./Router/Productos')


const app = express()


app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/* ------------------------------------------------------ */

const storage = multer.diskStorage({
    destination: ( req, file, cb) =>{
        cb(null,'uploads')
    },
    filename: ( req, file, cb) =>{
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


/* ------------------------------------------------------ */


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.use('/api/productos',routerProductos)




/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))