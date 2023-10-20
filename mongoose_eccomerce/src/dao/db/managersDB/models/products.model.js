import {Schema,model} from "mongoose";

const productsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    code:{
        type:String,
        required: true
    },
    status:{
        type:Boolean,
        default: true
    },
    stock:{
        type:Number,
        default: 0,
    },
    category:{
        type:String,
    },
    thumbnails:{
        type:String,
    },
})

export const productsModel = model ('Products', productsSchema)