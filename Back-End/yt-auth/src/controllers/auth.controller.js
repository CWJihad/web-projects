import userModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { log } from "console";
import sessionModel from "../models/session.model.js";
import {sendEmail} from '../services/email.service.js'
import { generateOtp, getOtpHtml } from "../utils/otp.utils.js"; 
import otpModel from '../models/otp.model.js'

async function register(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegistered) {
    return res.status(409).json({
      message: "You already registered",
    });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const otp = generateOtp()
  const html = getOtpHtml(otp)

  const otpHash = crypto.createHash('sha256').update(otp).digest('hex')

  await otpModel.create({
    email,
    user: user._id,
    otpHash
  })
  
  await sendEmail(email, 'OTP Verification', `Your OTP Code is ${otp}`, html)

  return res.status(201).json({
    message: "Registered Successfully",
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified
    },
  });
}

async function login(req, res) {
    const {username, password} = req.body

    const user = await userModel.findOne({
        username
    }) 

    if (!user) {
        return res.status(401).json({
            message: 'Invalid credential'
        })
    }

    if (!user.verified) {
      return res.status(401).json({
        message: 'Email not verified'
      })
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = hashedPassword === user.password

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const refreshToken = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, {
        expiresIn: '7d'
    })

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    }, config.JWT_SECRET, {
        expiresIn: '15m'
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 100
    })

    return res.status(200).json({
        message: "Login successfully",
        user: {
            username: user.username,
            email: user.email
        },
        accessToken
    })
    
    
    
}

async function user(req, res) {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized token!",
    });
  }

  const decoded = jwt.verify(accessToken, config.JWT_SECRET);

  console.log(decoded);

  const { username, email } = await userModel.findById(decoded.id);

  return res.status(200).json({
    message: "User fetched successfully",
    user: {
      username,
      email,
    },
  });
}

async function refreshAccessToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token not found",
    });
  }

  const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

  const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
  
  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false
  })
  
  if (!session) {
    return res.status(401).json({
        message: "Session Expired!"
    })
  }

  const accessToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const newRefreshToken = jwt.sign(
    {
      id: decoded.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  const newRefreshTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex')
  session.refreshTokenHash = newRefreshTokenHash
  await session.save()

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Access token refreshed successfully",
    accessToken,
  });
}

async function logout(req, res) {

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(400).json({
            message: "Unauthorized! refresh token not found"
        })
    }

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if (!session) {
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }

    session.revoked = true
    await session.save()

    res.clearCookie('refreshToken')

    res.status(200).json({
        message: "Logout successful"
    })
    
}

async function logoutAll(req, res) {
    const refreshToken = req.cookies.refreshToken    

    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh token is not found!"
        })
    }
    
    const decode = jwt.verify(refreshToken, config.JWT_SECRET)

    await sessionModel.updateMany({
        user: user._id,
        revoked: false
    },{
        revoked: true
    })

    res.clearCookie('refreshToken')

    return res.status(200).json({
        message: "Successfully logout from all devices"
    })
    
}

async function verifyEmail(req, res) {

  const {otp, email} = req.body

  const otpHash = crypto.createHash('sha256').update(otp).digest('hex')

  const verifyOtp = await otpModel.findOne({
    email,
    otpHash
  })

  if (!verifyOtp) {
    return res.status(401).json({
      message: 'Invalid OTP'
    })
  }

  const user = await userModel.findByIdAndUpdate(
    verifyOtp.user, 
    {verified: true},
    {new: true}
  )

  await otpModel.deleteMany({
    user: verifyOtp.user
  })

  return res.status(200).json({
    message: 'Email verified successfully',
    user: {
      username: user.username,
      email: user.email,
      verified: user.verified
    }
  })
  
}

export { register, user, refreshAccessToken, logout, logoutAll, login, verifyEmail };
