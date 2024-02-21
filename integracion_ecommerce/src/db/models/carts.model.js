import mongoose, { Schema, model} from "mongoose";

const cartsSchema = new Schema({
    products:[
        {
            product:{
                type: Schema.Types.ObjectId,  
                ref:"Products"
            },
            quantity:{
                type: Number,
            },
            _id: false,  //This means that the field will not be included in creating or updating a document by default.
        },
    ],
});

export const cartsModel = mongoose.model("Carts", cartsSchema);