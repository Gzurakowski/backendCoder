import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import connectMongo from 'connect-mongo'
import cors from 'cors'
import Login from './routes/login.js'
import productos from './routes/productos.js'
import mongoose from 'mongoose'
import Passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import UserDao from './daos/userDao.js'
import Bcrypt from 'bcrypt'

mongoose.connect("mongodb+srv://gonzalo:Coder123@coderhouse.yox2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const app = express()
const port = 3001

const whitelist = ['http://localhost:3000']
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  }
}

const userDao = new UserDao();


passport.use('login', new LocalStrategy(
  async (username, password, done) => {
    const user = await userDao.getByProperty('username', username)
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    const compare = await Bcrypt.compare(password, user.password)
    if (!compare) {
      return done(null, false, { message: 'Wrong password' })
    }

    return done(null, user)
  }
))

passport.use('signup', new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    const user = await userDao.getByProperty('username', username)

    if (user) {
      return done(null, false, { message: 'User already exists' })
    }

    const passwordHash = Bcrypt.hashSync(password, 10)

    const newUser = {
      username,
      password: passwordHash,
      address: req.body.address
    }
    try {
      const user = await userDao.save(newUser)
      console.log(user)
      return done(null, user)
    } catch (err) {
      console.log(err)
      done(null, false, { message: 'Error creating user' })
    }
  }

))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  done(null, userDao.getById(id))
})




app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({
  store: connectMongo.create({
    mongoUrl: "mongodb+srv://gonzalo:Coder123@coderhouse.yox2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    mongoOptions: advancedOptions
  }),

  secret: "MySecret",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 600
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/passport/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ username: req.user.username, address: req.user.address })
  } else {
    res.status(401).json({ error: 'Not logged in' })
  }
})


app.post('/passport/login', Passport.authenticate('login'), (req, res) => {
  console.log(req)
  const user = req.user
  res.status(200).json({ username: user.username, address: user.address })
})


app.post('/passport/signup', Passport.authenticate('signup'), (req, res) => {
  const user = req.user
  res.status(200).json({ username: user.username, address: user.address })
})

app.get('/passport/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out' })
  })
})


app.use('/api/login', Login)
app.use('/api/productos', productos)






app.listen(port, () => console.log(`Example app listening on port ${port}!`))