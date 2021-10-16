const {contenedor} = require("./Desafio2.js")
const express = require("express")
const PORT = 8080
const Contenedor = new contenedor("Test.txt")

const random = (number)=> parseInt(Math.random() * number)

const app = express()
const server = app.listen(PORT, ()=>{
    console.log("Servidor http escuchando en el puerto 8080")
    app.get("/productos" ,async (req,res) => {
        Productos = await Contenedor.getAll();
        console.log(Productos)
        res.send(Productos)
    })
    
    app.get("/productoRandom" ,async (req,res) => {
        try{
            Productos = await Contenedor.getAll(); 
            res.send(Productos[random(Productos.length)])
        }
        catch(error){
            console.log(error)
        }
    })
})


