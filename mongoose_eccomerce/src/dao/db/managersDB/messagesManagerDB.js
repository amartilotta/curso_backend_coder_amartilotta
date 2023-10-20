import { messagesModel } from "./models/messages.model.js";

class MessagesManager {

    async findAll(){
        const response = await productsModel.find()
        return response
    }

    async findMessagesFromUserById(id){
        const response = await productsModel.findById(id)
        return response
    }

    async saveMessage(obj){
        const response = await productsModel.create(obj)
        return response

    }

    async deleteMessageFromUserBy(id){
        const response = await productsModel.findByIdAndDelete(id)
        return response
    }
}

export const messagesManagerDB = new MessagesManager();