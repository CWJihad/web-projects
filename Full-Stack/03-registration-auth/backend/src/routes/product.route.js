import {Router} from 'express'
import {register, login} from '../controllers/auth.controller.js'
import {registrationValidation,loginValidation, accessValidation} from '../middlewares/auth.middleware.js'

const productRouter = Router()

productRouter.get('/', accessValidation, (req, res) => {
    
    return res.status(200).json([
        {
            name: 'apple',
            price: 10000
        },
        {
            name: 'samsung',
            price: 11000
        },
        {
            name: 'motorola',
            price: 12000
        },
        {
            name: 'infinix',
            price: 13000
        },
        {
            name: 'readmi',
            price: 14000
        },
        {
            name: 'vivo',
            price: 10040
        },
        {
            name: 'iqoo',
            price: 10001
        },
        {
            name: 'nothing',
            price: 12000
        },
    ])

})

export default productRouter