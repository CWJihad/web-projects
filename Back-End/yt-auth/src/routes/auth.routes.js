// routes all are the api
import {Router} from 'express'
import {register, user, refreshAccessToken, logout, logoutAll, login, verifyEmail} from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('/register', register)

authRouter.post('/login', login)

authRouter.get('/get-user', user)

authRouter.get('/refresh-token', refreshAccessToken)

authRouter.get('/logout', logout)

authRouter.get('/logout-all', logoutAll)

authRouter.get('/verify-email', verifyEmail)

export default authRouter