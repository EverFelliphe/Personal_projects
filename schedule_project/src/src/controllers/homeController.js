const HomeModel1 = require('../models/HomeModel');
const Contato = require('../models/contatoModel')
exports.Index = async (req,res) =>{
    const contatos = await Contato.buscaContato();

    res.render('index' , { contatos });
    
}
