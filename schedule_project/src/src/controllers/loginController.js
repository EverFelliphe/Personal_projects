const Login = require('../models/LoginModel')
exports.Index = (req,res) =>{
    if(req.session.user) return res.render('login-logado')
    res.render('login')
}
exports.register = async function (req,res){
    try{
 const login = new Login(req.body);
    await login.register();
    if(login.errors.length > 0){
        req.flash('errors', login.errors);
        req.session.save(() =>{
            return res.redirect('/login/index');
        });
        return;
    };
    req.flash('success', 'seu usuario foi criado com sucesso');
        req.session.save(() =>{
            return res.redirect('/login/index');
        });
    return 
    }catch(e){
        return res.render('erro404');
    }
   
};
exports.login = async function(req,res){
    try{
        const login = new Login(req.body);
           await login.login();
           if(login.errors.length > 0){
               req.flash('errors', login.errors);
               req.session.save(() =>{
                   return res.redirect('/login/index');
               });
               return;
           };
           req.flash('success', 'Login efetuado com sucesso');
           req.session.user = login.user;
            req.session.save(() =>{
                   return res.redirect('/login/index');
               });
           return 
           }catch(e){
               return res.render('erro404');
           }
}
exports.logout = function(req,res){
    
    req.session.destroy();
    
     res.redirect('/index');
}