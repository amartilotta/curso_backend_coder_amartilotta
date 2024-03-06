import winston from "winston"
import config from "../config/config.js"


const customLogger = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "black",
        error: "red",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "gray",
    },
}
  

export let logger

if (config.env === "prod") {
    logger = winston.createLogger({
        levels: customLogger.levels,
        transports: [
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLogger.colors }),
                    winston.format.simple()
                ),
            }),
            new winston.transports.File({
                filename: "./logs/errors.log",
                level: "error",
                format: winston.format.combine(
                    winston.format.timestamp({
                        format: 'DD-MM-YYYY HH:mm:ss', 
                    }),
                    winston.format.printf(
                        ({ timestamp, level, message }) => `${timestamp} - ${level}: ${message}` 
                    ),
                )
            }),
        ],
    })
} 
else {
    logger = winston.createLogger({
        levels: customLogger.levels,
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                winston.format.colorize({ colors: customLogger.colors }),
                winston.format.simple()
                ),
            }),
        ],
    })
}