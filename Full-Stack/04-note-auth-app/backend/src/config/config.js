import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI
const MAIL_USER = process.env.MAIL_USER
const MAIL_PASS = process.env.MAIL_PASS
const JWT_SECRET = process.env.JWT_SECRET
const CLIENT_URL = process.env.CLIENT_URL
const BACKEND_URL = process.env.BACKEND_URL
const NODE_ENV = process.env.NODE_ENV

if (!PORT) {
    throw new Error("PORT is not defined");
}
if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}
if (!MAIL_USER) {
    throw new Error("MAIL_USER is not defined");
}
if (!MAIL_PASS) {
    throw new Error("MAIL_PASS is not defined");
}
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
if (!CLIENT_URL) {
    throw new Error("CLIENT_URL is not defined");
}
if (!BACKEND_URL) {
    throw new Error("BACKEND_URL is not defined");
}
if (!NODE_ENV) {
    throw new Error("NODE_ENV is not defined");
}



export {
    PORT,
    MONGO_URI,
    MAIL_USER,
    MAIL_PASS,
    JWT_SECRET,
    CLIENT_URL,
    BACKEND_URL,
    NODE_ENV
}