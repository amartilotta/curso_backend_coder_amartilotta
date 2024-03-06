import { BasicMongo } from "./basic.mongo.js"
import { cartsModel } from "../models/carts.model.js"
import productsDao from "../dao/products.mongo.js"


class CartsMongo extends BasicMongo {
    constructor() {
        super(cartsModel)
    }

    async getById(cartId, lean=true){
        return lean ? this.model.findById(cartId).populate({ path: "products.product" }).lean() : this.model.findById(cartId).populate({ path: "products.product" })
    }
}

const cartsMongo = new CartsMongo()
export default cartsMongo