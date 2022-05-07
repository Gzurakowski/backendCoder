import mongoose from "mongoose";

const mensajeSchema = new mongoose.Schema({
    mensaje:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})

export default mongoose.model("mensajes", mensajeSchema)