import mongoose, {Schema,model} from "mongoose";

const cartsSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref:"products",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
})

export const cartsModel = model ('Carts', cartsSchema)