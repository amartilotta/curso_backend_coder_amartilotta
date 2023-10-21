import { cartsModel } from "./models/carts.model.js";

class CartsManager {

    async getCarts(){
        const response = await cartsModel.find()
        return response
    }

    async getCartById(id){
        const response = await cartsModel.findById(id)
        return response
    }

    async addCart(productsList){
        const response = await cartsModel.create({ products: productsList });
        return response

    }

    async addProductToCartById(id, obj){
        const response = await cartsModel.updateOne(
            { _id: id },
            { $set: obj }
        );
        return response

    }

    async deleteCartById(id){
        const response = await cartsModel.findByIdAndDelete(id)
        return response
    }
}

export const cartsManagerDB = new CartsManager()