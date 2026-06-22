import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

// ── GET PROFILE ──────────────────────────
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password -token -otp -otpExp")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// ── UPDATE FULL NAME ─────────────────────
const updateProfile = async (req, res) => {
    try {
        const { fullName } = req.body

        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        user.fullName = fullName || user.fullName
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                avatar: user.avatar
            }
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// ── UPDATE AVATAR ────────────────────────
const updateAvatar = async (req, res) => {
    try {
        const { avatar } = req.body  // ← base64 string from frontend

        if (!avatar) {
            return res.status(400).json({
                success: false,
                message: "Avatar is required"
            })
        }

        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        user.avatar = avatar
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Avatar updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                avatar: user.avatar
            }
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// ── CHANGE PASSWORD ──────────────────────
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            })
        }

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export { getProfile, updateProfile, updateAvatar, changePassword }