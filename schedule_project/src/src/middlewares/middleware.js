exports.middleware = (req,res,next) =>{
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;

    next();
};
exports.outromiddleware =(req,res,next)=>{
    console.log();
    console.log('passou no outro middleware global');
    console.log(req.body);
    next();
}

exports.checkCsrfError = (err, req, res,next)=>{
    if( err ){
        return res.render('erro404')    
    }
    next();

};
exports.CsfrMiddleware = ( req, res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    next()
    }

exports.checkLogin = (req, res, next) =>{
    if(!req.session.user){
        req.flash('errors', 'Você precisa estar logado');
        req.session.save(()=> res.redirect('/index'));
        return 
    }
    next();
}
