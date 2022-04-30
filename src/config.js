
import {initializeApp, applicationDefault} from 'firebase-admin/app'
import 'dotenv/config'
import mongoose from 'mongoose'

initializeApp({
  credential: applicationDefault(),
  databaseURL: "https://prueba-api-6b4ec-default-rtdb.firebaseio.com"
})


mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
