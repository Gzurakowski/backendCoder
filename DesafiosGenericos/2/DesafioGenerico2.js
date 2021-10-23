const moment = require('moment');
const fechaNacimiento = moment("20011128","YYYYMMDD");
const fechaActual = moment()

const diffDays = fechaActual.diff(fechaNacimiento, 'days')

console.log(`hoy es ${fechaActual}`)
console.log(`naci en ${fechaNacimiento}`)
console.log(`pasaron ${fechaNacimiento.fromNow()}`)
console.log(`pasaron ${diffDays} dias`)