import fs from 'fs'

export default class contenedorArchivo {
    
    constructor(archivo){
        this.id = 0
        this.archivo = archivo;
    }
    
    async save(data){
        data.id = this.id
        await fs.promises.readFile(this.archivo,'utf-8')
        .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
        .then(arch => {
            if (arch.length != 0){
                data.id = arch[arch.length - 1].id + 1;
                this.id = data.id;
            }
            arch.push(data);
            return arch;
        })// si hay un array de objetos agrega el nuevo objeto
        .then(arch => {
            fs.promises.writeFile(this.archivo, JSON.stringify(arch)).catch(error =>console.log(error))
        })// y vuelve a escribir el archivo
        .catch(error => {
            console.log(error);
            fs.promises.writeFile(this.archivo, JSON.stringify([data])).catch(err => console.log(err));
            console.log('se creo el archivo')
            this.id = null;        
        })
        return this.id;
    }

    async getById(number){
        return await fs.promises.readFile(this.archivo,'utf-8')
        .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
        .then(arch => arch.filter(obj => obj.id == number)[0])
        .catch(error => console.log(error))
    }
    
    async getAll(){
        return await fs.promises.readFile(this.archivo,'utf-8')
        .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
        .catch(error => console.log(error))
    }
    
    async editById(id, changedElement){
        return await fs.promises.readFile(this.archivo,'utf-8')
        .then(arch => JSON.parse(arch))
        .then(arch => {
            arch = arch.map(Element => {
                if (Element.id == id){
                    Element = changedElement
                    Element.id = id
                }
                return Element
            })
            return arch
        })
        .then(async arch => await fs.promises.writeFile(this.archivo, JSON.stringify(arch)).catch(error =>console.log(error)))
        .catch(err => console.log(err))
        
    }
    
    async deleteById(number){
        await fs.promises.readFile(this.archivo,'utf-8')
        .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
        .then(arch => arch.filter(obj => obj.id != number))
        .then(async arch => {
            await fs.promises.writeFile(this.archivo, JSON.stringify(arch)).catch(error =>console.log(error))
        })
        .catch(error => console.log(error))
    }
    
    async deleteAll(number){
        await fs.promises.writeFile(this.archivo, JSON.stringify([])).catch(error =>console.log(error))
    }
}
