import { BasicMongo } from "./basic.mongo.js"
import { usersModel } from "../models/users.model.js"


class UsersMongo extends BasicMongo {
    constructor() {
        super(usersModel)
    }

    async getByEmail(email, lean=true){
        return lean ? this.model.findOne({"email":email}).lean() : this.model.findOne({"email":email})
    }
}

const usersMongo = new UsersMongo()
export default usersMongo
