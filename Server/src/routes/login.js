import express, {Router} from 'express'
import userDao from '../daos/userDao.js'
import Bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;


const login = Router()

//Get Own Session
login.get('/', (req, res) => {
    if(req.session.username){
        res.status(200).json({username:req.session.username})
    }else{
        res.status(200).json({})
    }
})

//Login
login.post('/', (req, res) => {
    const {username} = req.body.data
    if(!req.session.username){
        req.session.username = username
        res.status(200).json({username:username})
    }else{
        res.sendStatus(200)
    }
})


//logout
login.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.sendStatus(500)
        else res.sendStatus(200)
    })
})


//signIn
login.post('/signIn', (req, res) => {
    const user = userDao.getByProperty('username', req.body.data.username);
    if(user){
        res.status(400).json({error:'User already exists'})
        return;
    }
    const {username, password} = req.body.data;
    
    
    password = Bcrypt.hashSync(password, SALT_ROUNDS);
    const newUser = {
        username,
        password
    }
    userDao.create(newUser);
    
    
    
})


export default login