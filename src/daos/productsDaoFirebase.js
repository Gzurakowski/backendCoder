import ContenedorFirebase from "../contenedores/FireBase/contenedorFirebase.js";

class productsDaoFirebase extends ContenedorFirebase {
    constructor(){
        super("productos")
    }
    
    async getAllProducts(){
        let prods = await this.getAll()
        prods = prods.map(prod => ({
            id:prod.id,
            timeStamp:prod.data().timeStamp,
            nombre:prod.data().nombre,
            descripcion:prod.data().descripcion,
            codigo:prod.data().codigo,
            foto:prod.data().foto,
            precio:prod.data().precio,
            stock:prod.data().stock
        }))
        return prods
    }
}

export default productsDaoFirebase