import {Schema,model} from "mongoose";

const cartsSchema = new Schema({
    products: [
        {
            title: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]

});

export const cartsModel = model ('Carts', cartsSchema)