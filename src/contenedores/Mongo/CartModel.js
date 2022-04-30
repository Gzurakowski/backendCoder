import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    timeStamp:{
        type:Date,
        required:true
    },
    
    products:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'product'
        }
    ]
    
    
})

export default mongoose.model("carts", cartSchema)