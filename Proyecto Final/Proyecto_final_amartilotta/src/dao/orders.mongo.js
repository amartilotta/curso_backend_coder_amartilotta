import { BasicMongo } from "./basic.mongo.js"
import { ordersModel } from "../models/orders.model.js"


class OrdersMongo extends BasicMongo {
    constructor() {
        super(ordersModel)
    }
}

const ordersMongo = new OrdersMongo()
export default ordersMongo
