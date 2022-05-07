import mongoose from "mongoose";
import ContenedorMongo from "../contenedores/Mongo/contenedorMongo.js";
import modelMensaje from "../contenedores/modelMensaje.js";

export default class daoMensaje extends ContenedorMongo{
    constructor(){
        super(modelMensaje)
    }
    
}