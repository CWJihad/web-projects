import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// basic express configurations for our backend app by middlewares
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended:true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// basic cors configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js"
import authRouter from "./routes/auth.routes.js"
import projectRouter from "./routes/project.routes.js"
import taskRouter from "./routes/task.routes.js"

// before res pass the middleware
app.use("/api/v1/healthcheck", healthCheckRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/task", taskRouter)

app.get("/", (req, res) => {
    res.send("Welcome to project management app")
})

export default app;