const express= require('express');
const route =express.Router();
const home = require('./src/controllers/homeController');
const loginController =require('./src/controllers/loginController');
const contatosController = require('./src/controllers/contatosController');
const {checkLogin} = require('./src/middlewares/middleware')
// function meumiddleware(req,res,next){
//     console.log();
//     console.log('passei no seu middleware');
//     console.log();
//     next();
// }

route.get('/index',home.Index,(req,res)=>{
    console.log('ainda estou aqui')
});
route.get('/login/index', loginController.Index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)
route.get('/contatos/index', checkLogin ,contatosController.Index)
route.post('/contatos/register', checkLogin ,contatosController.register)
route.get('/contatos/index/:id', contatosController.editIndex)
route.post('/contatos/edit/:id', contatosController.edit);
route.get('/contatos/delete/:id', contatosController.delete)


module.exports = route;
