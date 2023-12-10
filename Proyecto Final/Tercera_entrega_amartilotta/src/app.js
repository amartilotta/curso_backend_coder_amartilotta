import express from 'express';
import {engine} from 'express-handlebars';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js';
import './dao/db/configDB.js';
import productsRouterDb from './routes/products.router.db.js';
import cartsRouterDb from './routes/carts.router.db.js';

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
app.use('/views/', viewsRouter);
app.use('/apiDB/products', productsRouterDb);
app.use('/apiDB/carts', cartsRouterDb);


const httpServer = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
