import mongoose from 'mongoose';

const URI = "mongodb+srv://amartilotta:entrar123@micluster.jpwvkfc.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose
    .connect(URI)
    .then(() => console.log('DB is connected'))
    .catch(error => console.log(error))