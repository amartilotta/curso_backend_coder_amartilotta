import express from "express";
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars'
import { __dirname } from "./utils.js";
import viewsRouter from './routes/views.router.js'
import loginRouter from './routes/login.router.js'
import usersRouter from './routes/users.router.js'
import session from "express-session";
import FileStore  from "session-file-store";
import "./db/configDB.js";
import mongoStore from "connect-mongo"

const app = express(); // Revisar
const secret = '12345';
app.use(cookieParser(secret));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URI = "mongodb+srv://amartilotta:entrar123@micluster.jpwvkfc.mongodb.net/cookies?retryWrites=true&w=majority";


// Session file
/* const fileStore = FileStore(session);
app.use(session({
    secret: "SESSIONSECRETKEY",
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    store: new fileStore({
        path: __dirname + "/sessions",
        })
    })
) */

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

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars'); 

// Routes
app.use('/api/users', usersRouter);
app.use('/login', loginRouter);
app.use('/', viewsRouter);


app.get('/delete-cookie', (req, res) => {
    res.clearCookie('connect.sid').send('ESTAS ELIMINADO')
    res.clearCookie('name').send('ESTAS ELIMINADO x2')
})
/* app.get('/set-cookie', (req, res) => {
    res.cookie('idioma', 'ingles').json({msg:'ok'})
}); //Setear una cookie

app.get('/get-cookie', (req, res) => {
    console.log(req.cookies);
    const { idioma } = req.cookies;
    idioma === 'ingles' ? res.send('Hello') : res.send('Hola!')
}); //Obtener una cookie

app.get('/delete-cookie', (req, res) => {
    res.clearCookie('connect.sid').send('ESTAS ELIMINADO')
    res.clearCookie('name').send('ESTAS ELIMINADO x2')
})

app.get('/', (req, res) => {
    res.json({
        cookies: req.cookies,
        signedCookies: req.signedCookies
    })
}); //Setear una cookie

app.get('/set-signed-cookie', (req, res) => {
    res.cookie('curso', 'curso backend coderhouse', {signed: true}).json({msg:'ok'})
}); //Setear una cookie */


app.listen(8080, () => {
    console.log(" Listen por 8080 ");
});