const { Console } = require('console');
const { Router, json } = require('express');
const routerProductos = Router();

let C_id = 1
const CrearID = () => C_id++;

let Contenedor = []

routerProductos.use(json())
routerProductos.get('/', (req, res) =>{
    if (Contenedor.length > 0){
        res.json(Contenedor)
    }else{
        res.json({'error': "productos no encontrados"})
    }
    
})

routerProductos.get('/:id', async (req, res) =>{
    const id = parseInt(req.params.id) - 1;
    if (Contenedor[id]){
        res.json(Contenedor[id])
    }else{
        res.send({'error': "producto no encontrado"})
    }
})

routerProductos.post('/',(req, res) =>{
    const producto = req.body;
    producto.price = parseInt(producto.price)
    producto.id = CrearID()
    Contenedor.push(producto)
    res.send(`<h1> Producto guardado con exito con el id: ${producto.id} <h1>  `)
})


routerProductos.put('/:id',  (req,res) =>{
    const id = parseInt(req.params.id);

    if (Contenedor[id]){
        Contenedor[id].title = req.body.title;
        Contenedor[id].price = req.body.price;
        Contenedor[id].thumbnail = req.body.thumbnail;
        res.json(Contenedor[id])
    }else{
        res.send({'error': "producto no encontrado"})
    }
    
})

routerProductos.delete('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    if (Contenedor[id]){
        Contenedor = Contenedor.filter(producto => producto.id != id)        
        res.send(`<h1> El producto ha sido eliminado con exito <h1> `)
    }else{
        res.send({'error': "producto no encontrado"})
    }
    
})


exports.routerProductos = routerProductos