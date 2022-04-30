import contenedorArchivo from "../contenedores/Archivos/contenedorArchivo.js"

export default class productosDaoFS extends contenedorArchivo {
    constructor(){
        super('../contenedores/Archivos/productos.txt')
    }
}