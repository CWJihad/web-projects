import nodemailer from "nodemailer";
import {
  MAIL_USER,
  MAIL_PASS,
  BACKEND_URL,
} from "../config/config.js";
import { getVerifyMailTemplate, getOtpTemplate } from "./email-templates.js";

const verifyMail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  // The verify link hits your backend, which sets verified = true, then redirects to login
  const verifyLink = `${BACKEND_URL}/api/auth/verify-email?token=${token}`;

  const htmlTemplate = getVerifyMailTemplate(verifyLink);

  const configuration = {
    from: `NoteAppAuth <${MAIL_USER}>`,
    to: email,
    subject: "✦ Verify Your Email — Action Required",
    html: htmlTemplate,
    // Plain-text fallback for email clients that don't render HTML
    text: `Hi! Please verify your email by visiting this link (expires in 10 minutes):\n\n${verifyLink}\n\nIf you didn't sign up, ignore this email.`,
  };

  transporter.sendMail(configuration, function (err, info) {
    if (err) {
      console.log("sending mail error", err);
    }
    console.log("sending mail successful");
  });
};

const sendOtp = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: MAIL_USER, pass: MAIL_PASS }
    })

    const configuration = {
        from: `NoteAppAuth <${MAIL_USER}>`,
        to: email,
        subject: '🔐 Your Password Reset OTP',
        html: getOtpTemplate(otp),
        text: `Your OTP is: ${otp}. It expires in 10 minutes.`
    }

    transporter.sendMail(configuration, (err, info) => {
        if (err) console.log('OTP mail error', err)
        else console.log('OTP mail sent', info)
    })
}

export { verifyMail, sendOtp};
