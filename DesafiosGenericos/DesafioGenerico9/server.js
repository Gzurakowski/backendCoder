const express = require('express')
const handlebars = require('express-handlebars')
const app = express()

app.engine('hbs', handlebars({
    extname:'.hbs',
    defaultLayout:'index.hbs'
}))


app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', (req, res) => res.render('main',{
    nombre:'Gonzalo',
    apellido:'zurakowski',
    edad:18,
    mail:'gonchizurak@gmail.com',
    telefono:'1556578127'
}))

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor error`))