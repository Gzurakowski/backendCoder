const fs = require('fs');

class Contenedor {
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
        .then(arch => arch.filter(obj => obj.id == number))
        .catch(error => console.log(error))
    }
    async getAll(){
        return await fs.promises.readFile(this.archivo,'utf-8')
        .then(arch => JSON.parse(arch))// si lee el archivo lo parsea
        .catch(error => console.log(error))
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

const test = async () => {
    contenedor = new Contenedor('Test.txt');
    for (let i = 0; i < 30; i++){
        console.log( await contenedor.save({title: i, price: 50,thumbnail: 'foto'}))
    }
    console.log( await contenedor.getById(20))
    await contenedor.deleteById(2)
    console.log( await contenedor.getAll())
    await contenedor.deleteAll()
    
    console.log( await contenedor.getAll())
}
test()



