import express from 'express'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

// middlewares
app.use(express.json())
app.use(bodyParser.json())  // to get data from client 
app.use(cors()) // anyone can request from another devices or server

// routes
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)

export default app

