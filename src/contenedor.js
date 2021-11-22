const knex = require('knex')

class DB {
    created = false
    constructor(options, tableName){
        this.db = knex(options)
        this.tableName = tableName
    }
    crearTabla(){
        if(this.tableName === 'mensajes'){
            this.db.schema.createTable('mensajes', table =>{
                table.increments('id')
                table.string('mail')
                table.string('mensaje')
                table.datetime('fecha')
            })
            .catch(err => {
                if(err.code === "ER_TABLE_EXISTS_ERROR"){
                    console.log('La tabla ya existe')
                }else{
                    console.log(err)
                }
                
            })
        }
        else if (this.tableName === 'productos'){
            this.db.schema.createTable('productos', table => {
                table.increments('id')
                table.string('titulo')
                table.integer('precio')
                table.string('foto')
                table.datetime('fecha')
            }).catch(err => console.log(err))
        }else{
            console.log('tabla invalida')
        }
        
    }
    
    async save(object){
        try{
            const currentTime = new Date().toISOString()
            object.fecha = currentTime.replace('T', ' ').replace('Z', ' ')
            await this.db(this.tableName).insert(object)
        }
        catch(err){
            console.log(err)
        }
    }

    async getAll(){
        return await this.db(this.tableName).select('*')
        .then(rows => rows.map((obj) => {
            return obj
        }))
    }


}

module.exports = {DB}
