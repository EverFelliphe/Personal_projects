const { render } = require('ejs');
const Contatos = require('../models/contatoModel')
exports.Index = function (req,res){
    res.render('contatos',{
        contato:{}
    })
};
exports.register = async function(req, res) {
    try{ 
    const contato = new Contatos(req.body)
    await contato.register();
    if(contato.errors.length > 0) {
        console.log(contato.errors)
        req.flash('errors', contato.errors);
        req.session.save(()=>   res.redirect(`/contatos/index`));
        return
    }
    req.flash('success', 'contato salvo com sucesso');
    req.session.save(()=>  res.redirect(`/contatos/index`));
} catch(e){
    console.log(e);
    res.render('erro404')
}
   
}
exports.editIndex = async function(req, res){
    if(!req.params.id) return res.render('erro404')
    console.log('chegou aqui')
    const contato = await Contatos.buscaID(req.params.id);
    if(!contato) return res.render('erro404')
    
    res.render('contatos',{  contato })

}
exports.edit= async function(req, res){
    if(!req.params.id) return res.render('erro404');
    const contato = new Contatos(req.body);
    await contato.edit(req.params.id)
    if(contato.errors.length > 0) {
        console.log(contato.errors)
        req.flash('errors', contato.errors);
        req.session.save(()=>   res.redirect(`/contatos/index`));
        return
    }
    req.flash('success', 'contato editado com sucesso');
    req.session.save(()=>  res.redirect(`/index`));
    return

}
exports.delete = async function (req, res){
    if(!req.params.id) return res.render('erro404');
    const contato = await Contatos.delete(req.params.id)
    if(!contato) {
       res.render('404')
    }
    req.flash('success', 'contato apagado com sucesso');
    req.session.save(()=>  res.redirect(`/index`));
    return
}