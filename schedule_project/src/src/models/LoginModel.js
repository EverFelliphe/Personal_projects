const mongoose =require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const LoginSchema = new mongoose.Schema({
    email:{type:String , required:true},
    senha: {type:String , required:true}
});
const LoginModel1 = mongoose.model('Login', LoginSchema);
class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    async login(){
        this.valida();
        if(this.errors.length > 0 ) return 
        this.user = await LoginModel1.findOne({email:this.body.email})
        if(!this.user) {
            this.errors.push('o usuario não existe');
            return;
        }
        if(!bcryptjs.compareSync(this.body.senha , this.user.senha)){
            this.errors.push('senha inválida');
            this.user = null;
            return
        }
    }
    async register(){
        this.valida();
        if(this.errors.length > 0 ) return
        await this.userExist();
        if(this.errors.length > 0 ) return
        const salt = bcryptjs.genSaltSync()
        this.body.senha = bcryptjs.hashSync(this.body.senha,salt)
        this.user = await LoginModel1.create(this.body)

        
    }
    async userExist(){
        this.user = await LoginModel1.findOne({email:this.body.email})
        if(this.user){
            this.errors.push('este usuario já existe')
        }


    }   
    valida(){
        this.cleanUp();

        if(!validator.isEmail(this.body.email)) this.errors.push('email invalido')
        if(this.body.senha.length<3||this.body.senha.length>50){
            this.errors.push('a senha precisa ter entre 3 e 50 caracteres')
        }
    }
    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            };
        this.body ={
            email: this.body.email,
            senha:this.body.senha
        }
        }
    }
}
module.exports =Login;