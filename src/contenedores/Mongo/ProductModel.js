import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    timeStamp:{
        type:Date,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    codigo:{
      type:Number,
      required:true  
    },
    foto:{
        type:String,
        required:true
    },
    precio:{
      type:Number,
      required:true  
    },
    stock:{
        type:Number,
        required:true
    }
})

export default mongoose.model("product", prodSchema)