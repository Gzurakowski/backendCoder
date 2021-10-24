const express = require('express')

const app = express()


app.use(express.urlencoded({extended: true}))

app.set('views', './views')
app.set('view engine', 'pug')




/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor error`))