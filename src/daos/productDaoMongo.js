import mongoose from "mongoose";
import ContenedorMongo from "../contenedores/Mongo/contenedorMongo.js";
import ProductModel from "../contenedores/Mongo/ProductModel.js";

export default class productDaoMongo extends ContenedorMongo{
    constructor(){
        super(ProductModel)
        this.id = 0
    }
    
    async create(data){
        data.id = this.id
        this.id++ 
        return this.save(data)
    }
    
    async getAllProducts(){
        return await this.getAll()
    }
}