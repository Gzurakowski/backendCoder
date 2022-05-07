import mongoose from "mongoose";
import ContenedorMongo from "../contenedores/contenedorMongo.js";
import modelProducto from "../contenedores/modelProducto.js";

export default class daoProductos extends ContenedorMongo{
    constructor(){
        super(modelProducto)
    }
    
}