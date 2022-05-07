import express, {Router} from 'express'

const login = Router()


login.get('/', (req, res) => {
    if(req.session.username){
        res.status(200).json({username:req.session.username})
    }else{
        res.status(200).json({})
    }
})

login.post('/', (req, res) => {
    const {username} = req.body.data
    if(!req.session.username){
        req.session.username = username
        res.status(200).json({username:username})
    }else{
        res.sendStatus(200)
    }
})

login.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) res.sendStatus(500)
        else res.sendStatus(200)
    })
})

export default login