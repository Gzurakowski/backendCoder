const knex = require('knex')({
    client:'mysql',
    connection:{
        host:'127.0.0.1',
        user:'root',
        password:'loveatPC1',
        database:'coderHouse'
    },
    pool:{min:0, max:7}
})

const users = knex.from('usuarios').select('Nombre')
.then(rows => {
    console.log(rows)
})
.catch(err => console.log(err))
.finally(() => {
    knex.destroy
})