import dotenv from "dotenv"

dotenv.config()

export default {
    env: process.env.ENV,
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    appSecretKey: process.env.SECRET_KEY,
    gmailUser: process.env.GMAIL_USER,
    gmailPassword: process.env.GMAIL_PASS,
}