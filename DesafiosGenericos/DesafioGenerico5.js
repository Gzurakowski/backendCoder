const express = require('express')
const app = express()
const port = 8080
let frase = "Hola mundo como estan"
app.get('/api/frase', (req, res) =>{
    res.json({msg: frase})
})
app.get('/api/letras/:num', (req,res) =>{
    num = parseInt(req.params.num)
    res.json({msg: frase[num]})
})
const palabras = frase.split(' ')
app.get('/api/palabras/:num',(req,res) =>{

    num = parseInt(req.params.num)
    res.json({msg: palabras[num]})
})

app.post('/api/palabras', (req,res )=>{
    palabras.push(req.query.palabra)
    frase = palabras.join(' ');
    res.json({msg: frase})
})

app.put('/api/palabras/:pos', (req, res) =>{
    ({pos} = req.params);
    ({palabra} = req.query)
    palabras.splice(pos, 1, palabra)
    frase = palabras.join(' ')
    res.json({msg: frase})
})

app.delete('/api/palabras/:pos', (req,res) => {
    ({pos} = req.params);
    palabras.splice(pos, 1)
    frase = palabras.join(' ')
    res.json({msg: frase})
})


app.listen(port, () => console.log(`Example app listening on port port!`))