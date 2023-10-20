import express from 'express';
import {engine} from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
//import { productManager } from "./ProductManager.js";
import './dao/db/configDB.js';
import productsRouter from './routes/products.router.js';
import productsRouterDb from './routes/products.router.db.js';
import cartsRouter from './routes/carts.router.js';

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

// routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/apiDB', productsRouterDb);


const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
});

// websocket - server

const socketServer = new Server(httpServer);

// connection - disconnect

const messages = [];

socketServer.on('connection', (socket)=>{
    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUserBroadcast', user);
    });

    socket.on('message', info =>{
        messages.push(info);
        socketServer.emit('chat', messages)
    });
});