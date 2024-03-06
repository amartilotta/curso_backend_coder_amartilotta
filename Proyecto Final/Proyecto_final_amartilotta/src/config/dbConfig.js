import mongoose from "mongoose"
import config from "./config.js"
import { logger } from "../utils/winston.js"


const URI = config.mongoURI

export function connectToDb(){
    mongoose
        .connect(URI)
        .then(() => logger.info("connected to db"))
        .catch((error) => logger.info(error))
}