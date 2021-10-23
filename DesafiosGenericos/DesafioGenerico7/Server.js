const  express = require('express')
const fs = require('fs')

const app = express()
app.engine('cte',(filepath, options, callback) => {
    fs.readFile(filepath, (err, content) => {
        if (err){
            return callback(new Error(err))
        }
        const rendered = content.toString()
                                .replace('@titulo@', options.titulo )
                                .replace('@mensaje@', options.mensaje)
                                .replace('@autor@', options.autor )
                                .replace('@version@', options.version )
    
            return callback(null, rendered)                              
        })
} )

app.set('views', './views')
app.set('view engine', 'cte')

try{
    app.get('/cte1', (req, res) => res.render('cte1/plantilla', {
        titulo:'cte1',
        mensaje:'Hola cte1',
        autor:'cte2',
        version:'1.0.1'
    }))
    
}catch(err){
    console.log(err)
}

app.get('/cte2', (req, res) => res.render('plantilla', {
    titulo:'cte2',
    mensaje:'Hola cte2',
    autor:'cte3',
    version:'2.0.1'
}))

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor error`))