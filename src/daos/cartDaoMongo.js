import mongoose from "mongoose";
import ContenedorMongo from "../contenedores/Mongo/contenedorMongo.js";
import CartModel from "../contenedores/Mongo/CartModel.js";

export default class cartDaoMongo extends ContenedorMongo{
    constructor(){
        super(CartModel)
        this.id = 0
    }
    
    async create(data){
        data.id = this.id
        this.id++ 
        return this.save(data)
    }
    
    async getCartById(id){
        let cart = await this.getById(id)
        cart = await cart.populate('products')
        return cart
        
    }
}