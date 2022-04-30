import firebase from 'firebase-admin'

class ContenedorFirebase{
    constructor(Collection){
        this.Collection = Collection
        this.db = firebase.firestore()
        this.query = this.db.collection(Collection)
    }
    
    async save(data){
        const doc = this.query.doc()
        return await doc.create(data)
    }
    
    async getById(id){
        const doc = this.query.doc(`${id}`)
        const get =  await doc.get()
        return get.data()
    }
    
    async getAll(){
        const snapShot = await this.query.get()
        return snapShot.docs
    }
    
    async updateById(id, data){
        const doc = this.query.doc(`${id}`)
        return await doc.update(data)
    }
    
    async deleteById(id){
        const doc = this.query.doc(`${id}`)
        return await doc.delete()
    }
    
}

export default ContenedorFirebase