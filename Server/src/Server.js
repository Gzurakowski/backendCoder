const express = require('express')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const cors = require('cors')
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

app.get('/api/login', (req, res) => {
    if(req.session.username){
        res.status(200).json({username:req.session.username})
    }else{
        res.status(200).json({})
    }
})

app.post('/api/login', (req, res) => {
    const {username} = req.body.data
    if(!req.session.username){
        req.session.username = username
        res.status(200).json({username:username})
    }else{
        res.sendStatus(200)
    }
})

app.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.sendStatus(500)
        else res.sendStatus(200)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))