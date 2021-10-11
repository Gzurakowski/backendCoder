const modulo = require("./Desafio2.js")
const express = require("express")
const PORT = 8080
const Contenedor = new modulo.Contenedor("Test.txt")

const app = express()
const server = app.listen(PORT, ()=>{
    console.log("Servidor http escuchando en el puerto 8080")
    app.get("/productos" ,async (req,res) => {
        Productos = await Contenedor.getAll();
        res.send(Productos)
    })
})

