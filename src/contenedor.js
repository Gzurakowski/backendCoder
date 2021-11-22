const knex = require('knex')

class DB {
    created = false
    constructor(options, tableName){
        this.db = knex(options)
        this.tableName = tableName
    }
    crearTabla(){
        console.log(knex.fn)
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
            }).catch(err => console.log('Base de datos ya creada'))
        }else{
            console.log('tabla invalida')
        }
        
    }
    
    save(object){
        try{
            const currentTime = new Date().toISOString()
            object.fecha = currentTime.replace('T', ' ').replace('Z', ' ')
            console.log(object)
            this.db(this.tableName).insert(object)
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
// class Contenedor {
//     constructor(archivo){
//         this.id = 0
//         this.archivo = archivo;
//     }
//     async save(data){
//         data.id = this.id
//         await fs.promises.readFile(this.archivo,'utf-8')
//         .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
//         .then(arch => {
//             if (arch.length != 0){
//                 data.id = arch[arch.length - 1].id + 1;
//                 this.id = data.id;
//             }
//             arch.push(data);
//             return arch;
//         })// si hay un array de objetos agrega el nuevo objeto
//         .then(arch => {
//             fs.promises.writeFile(this.archivo, JSON.stringify(arch)).catch(error =>console.log(error))
//         })// y vuelve a escribir el archivo
//         .catch(error => {
//             console.log(error);
//             fs.promises.writeFile(this.archivo, JSON.stringify([data])).catch(err => console.log(err));
//             console.log('se creo el archivo')
//             this.id = null;        
//         })
//         return this.id;
//     }

    
//     async getAll(){
//         return await fs.promises.readFile(this.archivo,'utf-8')
//         .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
//         .catch(error => console.log(error))
//     }
    
// }