import joi from 'joi'
import jwt from 'jsonwebtoken'

const registrationValidation = (req, res, next) => {

    const registration = joi.object({
        username: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(20).required(),
    })

    const {error} = registration.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Bad request! Follow the requirement!', error
        })
    }
    
    next()
    
}

const loginValidation = (req, res, next) => {

    const login = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(20).required(),
    })

    const {error} = login.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Bad request! Follow the requirement!', error
        })
    }
    
    next()
    
}

const accessValidation = (req, res, next) => {

    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, token is required"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized! token wrong or expired'
        })
    }
    
}

export {
    registrationValidation,
    loginValidation,
    accessValidation
}