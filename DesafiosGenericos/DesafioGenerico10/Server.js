const express = require('express')
const pug = require('pug')
const app = express()




app.set('view engine', 'pug')
app.set('views', './views')

app.get('/datos', (req,res) =>{
    params = req.query
    console.log(params)
    
    res.render('index.pug', params)
})




/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor error`))