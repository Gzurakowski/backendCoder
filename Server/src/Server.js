import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import connectMongo from 'connect-mongo'
import cors from 'cors'
import Login from './routes/login.js'
import productos from './routes/productos.js'
import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://gonzalo:Coder123@coderhouse.yox2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser:true,
  useUnifiedTopology:true
})


const advancedOptions = {useNewUrlParser:true, useUnifiedTopology:true}
const app = express()
const port = 3001

const whitelist = ['http://localhost:3000' ]
const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({
   store:connectMongo.create({
       mongoUrl:"mongodb+srv://gonzalo:Coder123@coderhouse.yox2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
       mongoOptions:advancedOptions
   }),
   
   secret:"MySecret",
   resave:false,
   saveUninitialized:false,
   cookie:{
       maxAge:60000
   }
}))

app.use('/api/login', Login)
app.use('/api/productos', productos)






app.listen(port, () => console.log(`Example app listening on port ${port}!`))