import { statusMessages, errorMessages } from "../utils/responses.js"
import { logger } from "../utils/winston.js"


export function errorMidleware(error, req, res, next){
    logger.error(error.message)
    return res.send({success:false, status:statusMessages.ERROR, message:error.message || errorMessages.SERVER_ERROR})
}