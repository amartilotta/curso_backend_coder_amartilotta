import { cartsModel } from "./models/carts.model.js";

class CartsManager {

    async getCarts(){
        try{
        const response = await cartsModel.find().lean()
        return response
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getCartById(id){
        try {
        const response = await cartsModel.findById(id).populate({ path: "products.product"}).lean()
        return response
        } catch (error){
            console.error(error)
            return error
        }
    }

    async createCart(){
        try{
        const response = await cartsModel.create({});
        return response
        } catch (error){
            console.error(error)
            return error
        }
    }

    async addProductToCartById(id, obj){
        try {
        const response = await cartsModel.updateOne(
            { _id: id },
            { $set: obj }
        );
        const success = result.matchedCount > 0
        return success
        } catch (error){
        console.error(error)
        return error
    }
    }

    async deleteCartById(id){
        try {
        const response = await cartsModel.findByIdAndDelete(id)
        return response
        } catch (error){
            console.error(error)
            return error
        }
    }
}

export const cartsManagerDB = new CartsManager()