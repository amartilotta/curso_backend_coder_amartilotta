import customError from "../utils/customError.js"


export function validateBodyParams(params) {
  return function(req, res, next) {
    for (const param of params) {
      const [name, type] = Object.entries(param)[0]
      if (!req.body.hasOwnProperty(name) || typeof req.body[name] !== type) {
        customError.throw(`${name} is required and his type must be ${type}`, 400)
      }
    }
    next()
  }
}
  