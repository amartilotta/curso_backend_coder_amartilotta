import express  from "express";
import usersRouter from './routes/users.router.js';
import './db/dbConfig.js';
import mongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from "passport";
import './passport.js';
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import clientsRouter from './routes/clients.router.js';
import { clientsCustomRouter } from "./routes/clientsCustom.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set("view engine", "handlebars");

// Session
app.use(
    session({
        store: new mongoStore({
            mongoUrl: 
                "mongodb+srv://amartilotta:entrar123@micluster.jpwvkfc.mongodb.net/clase12?retryWrites=true&w=majority"
        }),
        secret: 'SESSION_KEY',
        cookie: {maxAge: 60000},
    })
);


// Passport
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
//app.use("/api/clients", clientsRouter);
app.use("/api/clients", clientsCustomRouter.getRouter());
app.use("/", viewsRouter);

app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});