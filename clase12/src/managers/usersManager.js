import { usersModel } from "../db/models/users.model.js";

class UsersManager {

    async getById(id){
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const response = await usersModel.findById(id);
        return response;
            // Yes, it's a valid ObjectId, proceed with `findById` call.
        }
        
    }

    async getByEmail(email){
        const response = await usersModel.findOne({email})
        return response;
    }

    async createOne(obj){
        const response = await usersModel.create(obj);
        return response;
    }
}

export const usersManager = new UsersManager();