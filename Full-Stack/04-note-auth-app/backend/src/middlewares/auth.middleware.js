import {JWT_SECRET} from '../config/config.js'
import jwt from 'jsonwebtoken'
// auth.middleware.js
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET)
        req.user = decode
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

export {
    authMiddleware
}