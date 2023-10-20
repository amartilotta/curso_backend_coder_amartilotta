import mongoose from "mongoose";

const URI = "mongodb+srv://amartilotta:minombre12@micluster.jpwvkfc.mongodb.net/mongoose47310?retryWrites=true&w=majority";

mongoose
    .connect(URI)
    .then(()=> console.log('Conectado a la base de datos'))
    .catch((error) => console.log(error));