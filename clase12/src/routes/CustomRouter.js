import { Router } from "express";

export default class CustomRouter {
    
    constructor(){
        this.router = Router();
        this.init();
    }

    getRouter(){
        return this.router;
    }

// '/:idUser',jwtValidation, authMiddleware(['admin','premium']), async (req, res) => {

// endpoint = '/:iduser
// functions = [jwtVlid,authMid,cb]
    get(endpoint,...functions){
        this.router.get(endpoint, this.customResponses, this.resolveFunctions(functions));
    }

    post(endpoint,...functions){
        this.router.post(endpoint,this.customResponses,this.resolveFunctions(functions));
    }

    put(endpoint,...functions){
        this.router.put(endpoint, this.customResponses,this.resolveFunctions(functions));
    }

    delete(endpoint,...functions){
        this.router.delete(endpoint, this.customResponses,this.resolveFunctions(functions));
    }

    resolveFunctions(functions){
        return functions.map((fn) => { //Le digo que vaya a cada una de las funciones
            return async (...param)=>{
                try {
                    await fn.apply(this, param); // y la ejectute
                } catch (error) {
                    return error;
                }
                
            }
        })
    }

    customResponses(req,res,next){
        res.serverError = (error)=>res.json({status: "Server Error", error});
        res.succesResponse = (message, data) => res.json({status: "Success", message,data});
        res.errorResponse = (message) => res.json({status: "Error", message});
        next();
    }
}