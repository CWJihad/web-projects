import {Router} from 'express'
import {register, verifyEmail, login, logout,forgotPassword,resetPassword,verifyOtp} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { userSchema, userValidate } from '../validators/user.validate.js'

const authRouter = Router()

// --- Public routes (no auth needed)
authRouter.post('/register',userValidate(userSchema), register)
authRouter.post('/login', login)
authRouter.get('/verify-email', verifyEmail)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/verify-otp', verifyOtp)
authRouter.post('/reset-password', resetPassword)

// --- Protected routes (must be logged in)
authRouter.post('/logout', authMiddleware, logout)

export default authRouter