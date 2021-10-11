const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

const nombres = (array) => {
    str = []
    array.forEach(obj=>{
        str.push(obj.nombre)
    })
    return str.join(', ')
}

const precioTotal = (array) => {
    total = 0
    array.forEach(obj=>{
        total = total + obj.precio    
    })
    return total
}


const precioPromedio = (array) => {
    promedio = 0
    array.forEach(obj=>{
        promedio = promedio + obj.precio    
    })
    promedio = promedio / array.length
    return promedio
}
const menorPrecio = (array) => {
    menor = array[0].precio
    array.forEach(obj=>{
        if (obj.precio < menor){
            menor = obj.precio
        }  
    })
    return menor
}

const mayorPrecio = (array) => {
    mayor = array[0].precio
    array.forEach(obj=>{
        if (obj.precio > mayor){
            mayor = obj.precio
        }  
    })
    return mayor
}
console.log(nombres(productos))
console.log(precioTotal(productos))
console.log(precioPromedio(productos))
console.log(menorPrecio(productos))
console.log(mayorPrecio(productos))
