import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    edad:{
        type:Number,
        required:true
    },
    dni:{
        type:String,
        index:true,
        required:true
    },
    curso:{
        type:String,
        required:true
    },
    nota:{
        type:Number,
        required:true
    }
})

export const modelEstudiante = mongoose.model("Estudiante", schema)