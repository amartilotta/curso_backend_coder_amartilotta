//import mongoose from "mongoose";
//Otra manera
import {Schema, model} from "mongoose"

//Crear el esquema

const studentsSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    dni:{
        type: String,
        required: true,
        unique: true
    },
    curso:{
        type: String,
        required: true
    },
    nota:{
        type: Number,
        required: true
    }
})
//const studentsSchema = new Schema()


// Crear el model/col

export const studentsModel = model('Students', studentsSchema)




