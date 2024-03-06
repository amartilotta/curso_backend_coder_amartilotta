import customError from "../utils/customError.js"


export function loginRequired(req, res, next){
    if(req.session && req.user && req.user.email){
        next()
    }
    else{
        return res.redirect("/login")
    }
}

export function roleRequired(...requiredRoles){
    return (req, res, next) => {
        if (requiredRoles.includes(req.user.role)){
            next()
        }
        else{
            customError.throw("Unauthorized resource", 403)
        }
    }
}