import mongoose, {Schema, model} from "mongoose";

const usersSchema = new Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId, // Here we clarify that the type of the filed is going to be ObjectId.
        ref: 'Carts', // Here we clarify the colecction to take as a reference.
    },
    role: {
        type: String,
        default: 'user',
    },
})

export const usersModel = model("Users", usersSchema)
