import {Schema,model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
        default: []
    },
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = model ('Products', productsSchema)