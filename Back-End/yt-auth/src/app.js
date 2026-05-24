import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev")); // this is logger to know some important info about backend application like statuscode, response, time, etc
app.use(cookieParser())

// routes
app.use("/api/auth", authRouter);

export default app;



