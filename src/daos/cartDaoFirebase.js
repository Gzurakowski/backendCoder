import ContenedorFirebase from "../contenedores/FireBase/contenedorFirebase.js";

class cartDaoFirebase extends ContenedorFirebase {
    constructor(){
        super("carritos")
    }
    
    async getAllCarts(){
        let carts = await this.getAll()
        carts = carts.map(cart => ({
            id:cart.id,
            timeStamp:cart.data().timeStamp,
            productos:cart.data().productos
        }))
        return prods
    }
}

export default cartDaoFirebase