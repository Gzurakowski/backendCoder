import ContenedorMongo from "../contenedores/contenedorMongo.js";
import UserModel from "../contenedores/User.model.js";
export default class daouser extends ContenedorMongo{
    constructor(){
        super(UserModel)
    }
    
}