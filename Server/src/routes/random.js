import { Router } from "express";
import {fork} from 'child_process';

const forked = fork('./src/routes/functions/calculateRandom.js')
const random = Router();


random.get("/", (req, res) => {
    let amount = req.query.amount;
    if(!amount) amount = 1e9;
    forked.send(amount);
    
    forked.on("message", result => {
        res.status(200).json(result);
    })
})

export default random;