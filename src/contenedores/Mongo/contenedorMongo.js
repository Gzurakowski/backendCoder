import mongoose from 'mongoose'

class ContenedorMongo {
    constructor(Model){
        
        this.model = Model
        
    }
    
    async save(data){
        return await this.model.create(data)
    }
    
    async getById(id){
        return await this.model.findOne({id:id})
    }
    
    async getAll(){
        return await this.model.find({})
    }
    
    async updateById(id, obj){
        return await this.model.updateOne({id:id},{ $set:obj})
    }
    
    async deleteById(id){
        return await this.model.deleteOne({id:id})
    }
    
}

export default ContenedorMongo