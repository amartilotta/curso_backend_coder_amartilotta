import express from 'express';
import {engine} from 'express-handlebars';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import './dao/db/configDB.js';
import productsRouter from './routes/products.router.js';
import productsRouterDb from './routes/products.router.db.js';
import cartsRouter from './routes/carts.router.js';
import cartsRouterDb from './routes/carts.router.db.js';
import {messagesManagerDB} from './dao/db/managersDB/messagesManagerDB.js'

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
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/apiDB/products', productsRouterDb);
app.use('/apiDB/carts', cartsRouterDb);


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

    socket.on('message', async (info) =>{
        messages.push(info);
        const savedMessage = await messagesManagerDB.saveMessage(info)
        socketServer.emit('chat', messages)
    });
});