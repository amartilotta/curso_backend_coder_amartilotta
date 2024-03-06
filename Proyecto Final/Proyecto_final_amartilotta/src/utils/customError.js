export default class CustomError{
    static throw(message, statusCode){
        const error = new Error(message)
        error.statusCode = statusCode
        throw error
    }
}