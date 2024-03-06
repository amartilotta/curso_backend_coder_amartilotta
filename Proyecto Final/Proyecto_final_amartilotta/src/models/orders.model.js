import {Schema, model} from "mongoose"


const orderProductSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref:"products",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
})

const ordersSchema = new Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime:{
        type: Schema.Types.Date,
        required: true
    },
    products: {
        type: [orderProductSchema],
        required: true,
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        required: true
    }
})

export const ordersModel = model("orders", ordersSchema)