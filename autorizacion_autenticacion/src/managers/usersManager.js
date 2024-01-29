import { usersModel } from "../db/models/users.model.js";

class UsersManager {

    async getById(id){
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            console.log("buscando id");
            const response = await usersModel.findById(id);
        console.log("respone",response);
        return response;
            // Yes, it's a valid ObjectId, proceed with `findById` call.
        }
        
    }

    async getByEmail(email){
        console.log("soy el email buscado", email);
        const response = await usersModel.findOne({email})
        console.log("soy la respuesta", response);
        console.log("buscando el email");
        return response;
    }

    async createOne(obj){
        const response = await usersModel.create(obj);
        return response;
    }
}

export const usersManager = new UsersManager();