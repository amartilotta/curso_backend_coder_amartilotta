import mongoose ,{Schema, model }from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2" //to paginate in mongo

const  productsSchema = new Schema({
    name: { type : String , required : true },
    description : {type : String},
    price : {type : Number ,required : [true,"Please add a Price"]},
    stock: {type: Number, default:1}

});

productsSchema.plugin(mongoosePaginate) //to paginate in mongo

export const productsModel = model("Products", productsSchema)