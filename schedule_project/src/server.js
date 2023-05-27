require('dotenv').config();
const express =require('express');
const app =express();
const routes = require('./routes');
const path = require('path');
const { middleware , outromiddleware, checkCsrfError, CsfrMiddleware,  } = require('./src/middlewares/middleware');
const helmet = require('helmet')
const mongoose = require('mongoose');
const { Console } = require('console');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser:true , useUnifiedTopology:true})
    .then(resp => {
        console.log('conectou')
        app.emit('pronto')
    })
    .catch(e => console.log('erro',e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const csrf =require('csurf');
//CRUD CREATE READ UPDATE DELETE
//      POST   GET   PUT    DELETE
app.use(helmet())
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.set('views', path.resolve(__dirname,'src','views'))
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname,'public')));
const sessionOptions = session({
    secret:'akhgjahgf',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
});
app.use(sessionOptions);
app.use(flash());
app.use(csrf());
app.use(middleware);//nossos próprios middlewares globais
app.use(checkCsrfError);
app.use(CsfrMiddleware);


app.use(routes)
app.on('pronto', () =>{
    app.listen(3000 , () =>{
    console.log('acessar http://localhost:3000/index');
    console.log('servidor exexutando na porta 3000')
});
})


//fullmvc
