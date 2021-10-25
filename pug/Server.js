const express = require('express')

const app = express()
const productos = []

app.use(express.urlencoded({extended: true}))

app.set('views', './pug/views')
app.set('view engine', 'pug')

app.get('/', (req, res) =>{
    res.render('main', {ruta:''})
})

app.get('/productos', (req, res) =>{
    res.render('main', {ruta:'/productos', productos})
})

app.post('/productos', (req, res) =>{
    productos.push(req.body)
    res.redirect('/')
})


/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor error`))