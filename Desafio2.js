const fs = require('fs');

class Contenedor {
    constructor(archivo){
        this.id = 0
        this.archivo = archivo;
    }
    async save(data){
        data.id = this.id
        fs.promises.readFile(this.archivo,'utf-8')
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
            fs.promises.writeFile(this.archivo, JSON.stringify(arch)).catch(error =>console.log(error));
        })// y vuelve a escribir el archivo
        .catch(error => {
            console.log(error);
            fs.promises.writeFile(this.archivo, JSON.stringify([data])).catch(err => console.log(err));
            console.log('se creo el archivo')
        })
        .finally(() => {return this.id})

    }

    async getById(number){
        try {
            const Data = await fs.promises.readFile(this.archivo,'utf-8');
            console.log(Data.split(','))
            const Obj = JSON.parse(Data)
            const Obj2 = JSON.parse(Data)
            console.log(Obj)

            console.log(Obj2)

        } catch (error) {
           console.log(error) 
        }
        
        
    }
}

contenedor = new Contenedor('C:\\Users\\Gonzalo\\Desktop\\CursoCoder\\backendCoder\\JSON');
contenedor.save({title: 'queso', price: 50,thumbnail: 'foto'});

// contenedor.save({title: 'pan', price: 50,thumbnail: 'foto'});

setTimeout(() =>{
    contenedor.save({title: 'jamon', price: 50,thumbnail: 'foto'});
}, 1)




// setTimeout(() =>{
//     console.log(contenedor.getById(0))
// }, 1000)

