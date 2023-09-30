import express from 'express';
import {engine} from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import { productManager } from "./ProductManager.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

// handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// routes

app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
});

// websocket - server

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
    
    socket.on('addProduct', async (product) =>{
        const {title,description,price} = product
        const newProduct = await productManager.addProduct(title,description,price);
        socket.emit("productCreated", newProduct);
    });

    socket.on('deleteProduct', async (inputId) =>{

        let response = 1;

        const productFind = await productManager.getProductsById(+inputId)
        if (productFind) {
            console.log("Preparado para borrar el producto")
            await productManager.deleteProduct(+inputId);
        } else {
            console.log("entre al else")
            response = -1;
        }

        console.log("soy el response final", response)
        const newproducts = await productManager.getProducts({})
        console.log(newproducts)
        socket.emit('productDeleted', newproducts,response);
    });
});