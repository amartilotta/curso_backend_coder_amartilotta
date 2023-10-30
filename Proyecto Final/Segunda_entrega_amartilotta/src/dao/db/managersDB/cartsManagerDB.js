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
            let cart = await cartsModel.findById(id)
            const productArray = obj.products
            
            for (const item of productArray) {
                const existingProductIndexes = cart.products.reduce((indexes, elemento, index) => {
                    if (elemento.product.toString() === item.product.toString()) {
                        indexes.push(index);
                    }
                    return indexes;
                }, []);
    
                if (existingProductIndexes.length > 0) {
                    for (const index of existingProductIndexes) {
                        // Update the quantity of each existing product
                        cart.products[index].quantity += item.quantity || 1;
                    }
                } else {
                    // Add a new product if none were found
                    cart.products.push(item);
                }
            }
            const response = await cartsModel.updateOne(
                { _id: id },
                cart
            );
            const success = response.matchedCount > 0
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