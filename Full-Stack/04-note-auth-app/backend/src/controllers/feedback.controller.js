import nodemailer from "nodemailer"
import userModel from "../models/user.model.js"
import { getFeedbackTemplate } from "../utils/email-templates.js"
import {MAIL_PASS, MAIL_USER} from '../config/config.js'

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
})

const sendFeedback = async (req, res) => {
    try {
        const { subject, message } = req.body

        if (!subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Subject and message are required"
            })
        }

        const user = await userModel.findById(req.user.id).select("fullName email username")

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const initials = user.fullName
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)

        const html = getFeedbackTemplate(user, initials, subject, message)

        await transporter.sendMail({
            from: `"Notes App" <${process.env.GMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: `[Feedback] ${subject} — from ${user.fullName}`,
            html,
        })

        return res.status(200).json({
            success: true,
            message: "Feedback sent successfully"
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export { sendFeedback }