const mongoose =require('mongoose');

const homeSchema = new mongoose.Schema({
    titulo:{type:String , required:true},
    descricao: String
});
const HomeModel1 = mongoose.model('Home', homeSchema);
class Home{

}
module.exports =HomeModel1;