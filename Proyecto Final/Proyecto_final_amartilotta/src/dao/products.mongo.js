import { BasicMongo } from "./basic.mongo.js"
import { productsModel } from "../models/products.model.js"


class ProductsMongo extends BasicMongo {
    constructor() {
        super(productsModel)
    }

    async getProductsPage(query, options) {
        return productsModel.paginate(query, options)
    }
}

const productsMongo = new ProductsMongo()
export default productsMongo
