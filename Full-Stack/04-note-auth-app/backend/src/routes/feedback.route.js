import express from "express"
import { sendFeedback } from "../controllers/feedback.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const feedbackRouter = express.Router()

feedbackRouter.post("/", authMiddleware, sendFeedback)

export default feedbackRouter