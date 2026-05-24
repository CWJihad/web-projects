// documentation or resource: https://github.com/ankurdotio/Difference-Backend-video/tree/main/026-nodemailer
import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

// verify connection configuration
transporter.verify((error, success) => {

    if (error) {
        console.error('Error connecting to email server: ', error);
    }
    else {
        console.log('Email server is ready to send message');
    }

})

export const sendEmail = async (to, subject, text, html) => {

    try {

        const info = await transporter.sendMail({
            from: `Md Jihad Khan <${process.env.GOOGLE_USER_EMAIL}>`,
            to,
            subject,
            text,
            html
        })

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
    } catch (error) {
        
        console.error('Error sending email: ', error);
        
        
    }
    
}



