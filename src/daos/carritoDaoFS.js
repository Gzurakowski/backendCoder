import contenedorArchivo from "../contenedores/Archivos/contenedorArchivo.js"

export default class carritoDaoFS extends contenedorArchivo {
    constructor(){
        super('../contenedores/Archivos/carritos.txt')
    }
}