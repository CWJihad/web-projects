import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middleware.js'

const app = express()

// cors tells us which are be avail or not be avail
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)

// common middlewares
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))
app.use(cookieParser())



// import routes
import healthCheckRouter from "./routes/healthcheck.route.js"
import userRouter from "./routes/user.route.js"


// implement routes
app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/users", userRouter)

// below of all routes
app.use(errorHandler)


export {app}