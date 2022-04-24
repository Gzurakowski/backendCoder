const express = require('express')

const server = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));



server.listen(3000, () => {
    console.log(`Server is Listening on 3000`)
})