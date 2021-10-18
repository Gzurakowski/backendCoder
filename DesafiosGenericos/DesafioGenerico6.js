const express = require('express')
const Router = express
const app = express()
const router = new Router()
const port = 8080

const mascotas = []
const personas = []

router.get('/mascotas', (req,res)=>{
    res.json({msg: mascotas})
})

router.post('/mascotas', (req,res)=>{
    const {mascota} = req.query
    mascotas.push(mascota)
    res.json({msg: mascotas})
})

router.get('/personas', (req,res)=>{
    res.json({msg: personas})
})

router.post('/personas', (req,res)=>{
    const {persona} = req.query
    personas.push(persona)
    res.json({msg: personas})
})

app.use('/api',router)
app.listen(port, () => console.log(`Example app listening on port port!`))