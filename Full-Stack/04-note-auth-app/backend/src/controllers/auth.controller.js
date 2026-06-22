import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import { verifyMail, sendOtp } from "../utils/verify-mail.js";
import { JWT_SECRET, CLIENT_URL, NODE_ENV } from "../config/config.js";

// ─────────────────────────────────────────
//  REGISTER
// ─────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      username,
      email,
      password: hashedPass,
    });

    // Short-lived token (10 min) — only used for email verification
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "10m" });

    user.token = token;
    await user.save();

    // verification email
    verifyMail(token, email);

    return res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
      success: true,
      user: { fullName, username, email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
//  VERIFY EMAIL  (GET /api/auth/verify-email?token=...)
//  Called when user clicks the button in the email.
//  On success → redirect to login page.
// ─────────────────────────────────────────
const verifyEmail = async (req, res) => {
  try {
    // Token comes from the query string in the email link
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing",
      });
    }

    // Decode & validate
    let decode;
    try {
      decode = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Verification link has expired. Please register again.",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Token may be invalid.",
      });
    }

    if (user.verified) {
      // Already verified — just send them to login
      return res.redirect(`${CLIENT_URL}/login?verified=already`);
    }

    // Mark verified, clear one-time token
    user.verified = true;
    user.token = null;
    await user.save();

    // ✅ Redirect to login page after successful verification
    return res.redirect(`${CLIENT_URL}/login?verified=true`);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
//  LOGIN  — blocks unverified users
// ─────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🚫 Block login until email is verified
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email before logging in. Check your inbox.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Issue a session/auth token (longer lived)
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      domain: "localhost",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // in your login controller, instead of sending token in response body
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        fullName: user.fullName, username: user.username, email: user.email, avatar: user.avatar, id: user._id
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: "You are already logged out",
    });
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax", 
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// ── FORGOT PASSWORD ──────────────────────
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExp = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExp = otpExp;
    await user.save();

    sendOtp(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ── VERIFY OTP ───────────────────────────
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check otp not expired
    if (user.otpExp < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // check otp matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // otp verified — clear it
    user.otp = null;
    user.otpExp = null;
    await user.save();

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "10m",
    });

    res.cookie("resetToken", resetToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ── RESET PASSWORD ───────────────────────
const resetPassword = async (req, res) => {
  try {
    // ✅ match what frontend sends
    const { newPass, confirmPass } = req.body;

    // read resetToken from cookie
    const resetToken = req.cookies.resetToken;

    if (!resetToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - please verify OTP first",
      });
    }

    if (newPass !== confirmPass) {
      return res.status(403).json({
        success: false,
        message: "Both should be same password !!",
      });
    }

    // verify token
    let decode;
    try {
      decode = jwt.verify(resetToken, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Reset session expired - please try again",
      });
    }

    const user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // update password
    user.password = await bcrypt.hash(newPass, 10);
    await user.save();

    // clear reset cookie
    res.clearCookie("resetToken", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
