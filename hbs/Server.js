const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const productos = []



app.use(express.urlencoded({extended: true}))

app.set('views', './hbs/views')
app.set('view engine', 'hbs')

app.engine('hbs', handlebars({
    extname:'.hbs',
    defaultLayout:'index.hbs'
}))

app.get('/', (req, res) =>{
    res.render('main', {rutaFormulario:true, rutaProductos:false})
})

app.get('/productos', (req, res) =>{
    const hayProductos = productos.length > 0
    res.render('main', {rutaProductos:true, productos, formulario:false, hayProductos:hayProductos})
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