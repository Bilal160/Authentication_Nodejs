import express from 'express'
import dotenv from 'dotenv'
import MongoConnection from './database/db.js'
import authuser from './routes/auth.js'
dotenv.config()
const app = express()

// middlewares
app.use(express.json())

// routes
app.use(
    '/api/user',authuser
)

MongoConnection()
app.listen(process.env.PORT,()=>{
    console.log(`Server runing on http://localhost:${process.env.PORT}`)
})