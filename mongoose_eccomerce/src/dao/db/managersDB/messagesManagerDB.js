import { messagesModel } from "./models/messages.model.js";

class MessagesManager {

    async saveMessage(obj){
        const response = await messagesModel.create(obj)
        return response
    }
}

export const messagesManagerDB = new MessagesManager();