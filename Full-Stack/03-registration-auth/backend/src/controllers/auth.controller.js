import userModel from "../models/user.model.js";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

const generateAccessRefreshToken = (user) => {

    const refreshToken = jwt.sign({
        id: user._id
    }, JWT_SECRET, {
        expiresIn: '7d'
    })

    const accessToken = jwt.sign({
        id: user._id,
        username: user.username
    }, JWT_SECRET, {
        expiresIn: '15m'
    })

    return {refreshToken, accessToken}
    
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUser) {
      return res.status(409).json({         // ✅ added 409
        message: "User already exists",
        success: false,
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // ✅ Generate tokens BEFORE creating user
    const tempUser = { username, email };
    const { refreshToken, accessToken } = generateAccessRefreshToken(tempUser);

    const user = await userModel.create({
      username,
      email,
      password: hashedPass,
      refreshToken,             // ✅ now defined
    });

    return res.status(201).json({           // ✅ 201 = Created
      message: "User registration successful",
      user: { username, email },
      accessToken,                          // ✅ send accessToken to frontend
      success: true,
    });

  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,                 // ✅ only send message, not full error object
      success: false,
    });
  }
}

async function login(req, res) {

    const {email, password} = req.body

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credential"
        })
    }

    // const hashedPass = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }
    
    const { accessToken } = generateAccessRefreshToken(user)

    return res.status(200).json({
        message: 'Login successful',
        user: {
            username: user.username,
            email
        },
        accessToken
    })

    
    
}

export { register, login };
