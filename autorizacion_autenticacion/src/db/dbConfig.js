import mongoose from "mongoose"

const URI = "mongodb+srv://amartilotta:entrar123@micluster.jpwvkfc.mongodb.net/autorizacion_autenticacion?retryWrites=true&w=majority";

mongoose.connect(URI).then(() =>{
    console.log("Conectado a la bd");
})
.catch((error) => console.log(error));