class Usuario {
    
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [libros];
        this.mascotas = [mascotas];
    }

    getFullName(){
        return  `Mi nombre es: ${this.nombre} ${this.apellido}`
    }
    addMascota(mascota){
        console.log('Se agrego una mascota')
        this.mascotas.push(mascota)
    }
    countMascotas(){
        let contador = 0;
        this.mascotas.map(()=> contador++);
        return contador;
    }
    addBook(libro){
        console.log('Se agrego un libro')
        this.libros.push(libro)
    }

    getBookNames(){
        let nombres = []
        this.libros.map((libro) => nombres.push(libro.nombre));
        return nombres;
    }
}

user = new Usuario('Gonzalo', 'Zurakowski', {nombre: 'El señor de las moscas',autor: 'William Golding'}, 'perro');
console.log(user.getFullName())
user.addMascota('gato')
console.log(`Usted tiene ${user.countMascotas()} mascota/s`)
user.addBook({nombre: 'Fundacion', autor: 'Isaac Asimov'})
console.log(`Posee los siguientes titulos: ${user.getBookNames()}`)
