import mongoose, {Schema,model} from "mongoose";

const cartsSchema = new Schema({
    products: {
        type: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref:"Products",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
})

export const cartsModel = model ('Carts', cartsSchema)