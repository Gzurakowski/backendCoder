import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})

export default mongoose.model("product", prodSchema)