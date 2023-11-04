import express from 'express';
import {engine} from 'express-handlebars';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js';
import './dao/db/configDB.js';
import productsRouterDb from './routes/products.router.db.js';
import cartsRouterDb from './routes/carts.router.db.js';
import usersRouterDb from './routes/users.router.db.js';
import session from "express-session";
import mongoStore from "connect-mongo"

const app = express();
const PORT = 8080;
const URI = "mongodb+srv://amartilotta:entrar123@micluster.jpwvkfc.mongodb.net/implementation_login?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));

// session mongo
app.use(session({
    secret: "SESSIONSECRETKEY",
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    store: new mongoStore({
        mongoUrl: URI
        }),
    })
)


// handlebars
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// routes
app.use('/views/', viewsRouter);
app.use('/apiDB/products', productsRouterDb);
app.use('/apiDB/carts', cartsRouterDb);
app.use('/apiDB/users', usersRouterDb);

const httpServer = app.listen(PORT, () => {
    console.log(`aaListening to port ${PORT}`);
});
