const mongoose =require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator')

const contatoSchema = new mongoose.Schema({
    nome:{type:String , required:true},
    sobrenome:{type:String, required:false, default:''},
    email:{type:String, required:false, default:''},
    telefone:{type:String, required:false, default:''},
    criadoEm:{type:Date, default:Date.now}
});
const contatoModel1 = mongoose.model('contato', contatoSchema);
function Contato(body){
    this.body = body;
    this.errors =[];
    this.contato = null;

    
}
Contato.buscaID = async function(id){
    console.log(typeof id )
    if(typeof id !== 'string') return
    const contatos = await contatoModel1.findById(id)
    console.log(contatos)
    return contatos
}
Contato.prototype.register = async function(){
    this.valida(); 
    if(this.errors.length > 0) return;
    this.contato = await contatoModel1.create(this.body)
    console.log('criou')

}
Contato.prototype.valida=function(){
    this.cleanUp();

    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('email invalido')
    if(!this.body.nome) this.errors.push('É necessário preencher pelomenos o campo de nome')
    if(!this.body.telefone && !this.body.email) this.errors.push('É necessário preencher pelomenos um contato')
    
}
Contato.prototype.cleanUp=function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
        };
    this.body ={
        nome: this.body.nome,
        sobrenome:this.body.sobrenome,
        email: this.body.email,
        telefone:this.body.telefone 
    }
    }
}
Contato.prototype.edit = async function(id){
    if(typeof id !== 'string') return
    this.valida();
    if(this.errors.length > 0 ) return
    this.contato = await contatoModel1.findByIdAndUpdate(id,this.body,{ new:true })
};
Contato.buscaContato = async function(){
    const contato = await contatoModel1.find()
        .sort({ criadoEm:-1 });
    return contato
}
Contato.delete = async function(id){
    if(typeof id !== 'string') return
    const contatos = await contatoModel1.findByIdAndDelete(id)
    console.log(contatos,'excluido')
    return contatos;

}
module.exports =Contato;