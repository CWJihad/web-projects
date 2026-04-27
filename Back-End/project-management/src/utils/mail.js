import Mailgen from "mailgen";
import nodemailer from "nodemailer"

// to sending an email
// first preparing the email. Configure mailgen by setting a theme and your product info
const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagelink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from: "mail.taskmanager@gmail.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Error: ", error);
        
    }

}

// this is the structure of mail or mail page
const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! We're love to have you on our board",
            action: {
                instructions: "To verify your account, please click on following button",
                button: {
                    color: "#22BC66",
                    text: "Confirm your account",
                    link: verificationUrl
                }
            },
            outro: "Need help or any question? Feel free to ask, as soon as possible we'd touch you."
        }
    }
}

const forgotPasswordVerifyMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We get a request to reset your account password",
            action: {
                instructions: "To reset password click on following button or link",
                button: {
                    color: "#22BC66",
                    text: "Reset Password",
                    link: passwordResetUrl
                }
            },
            outro: "Need help or any question? Feel free to ask, as soon as possible we'd touch you."
        }
    }
}

export {
    emailVerificationMailgenContent,
    forgotPasswordVerifyMailgenContent,
    sendEmail
}