import express from 'express';
import {engine} from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';

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

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
});

// websocket - server

const socketServer = new Server(httpServer);

// connection - disconnect

const names = []
// socketServer.on('connection', (socket)=> {
//     console.log(`Cliente conectado ${socket.id}`);
//     socket.on('disconnect', () => {
//         //console.log(`Cliente descoenctado ${socket.id}`);
//     });

//     socket.on("firstEvent", (info) => {
//         names.push(info)
//         //console.log(`The user name is: ${info}`);
//         //console.log(`Array: ${names}`);
//         //socket.emit('secondEvent', names); //Envia el evento al cliente que emitio el evento.
//         //socketServer.emit('secondEvent', names); // Envia el evento a todos los clientes.
//         socket.broadcast.emit('secondEvent', names); //Envia el evanto a todos los clientes a excepcion del que emitio el evento.
//     });

//     socket.on("thirdEvent", (info) => {
//         socketServer.emit('fourthEvent', info);
//     });
// });

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