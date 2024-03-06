import {Schema, model} from "mongoose"


const documentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    reference:{
        type: String,
        required: true
    },
})

const connectionSchema = new Schema({
    date:{
        type: Date,
        default: Date.now()
    },
    action:{
        type: String,
        enum: ["signup", "login", "logout"],
        required: true
    },
})

const usersSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
    },
    password:{
        type: String,
        required: true
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref:"carts",
        required: true
    },
    documents:{
        type: [documentSchema],
        default: [],
    },
    role:{
        type: String,
        default:"user"
    },
    last_connection: {
        type: connectionSchema,
    },
    from_github:{
        type: Boolean,
        default: false
    }
})

export const usersModel = model("users", usersSchema)