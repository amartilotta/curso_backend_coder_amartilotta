import BasicManager from "./basicManager.js";
import { cartsModel } from "../db/models/carts.model.js";

class CartsManager extends BasicManager{
    constructor(){
        super(cartsModel, 'products.product')
    }

    async addProductToCartById(cartId, obj){
        try {
            const validObjectId = /^[0-9a-fA-F]{24}$/; // Regular expresion for 24 character ObjectId

            if (!validObjectId.test(cartId)) {
                return 0
            }
            let cart = await cartsModel.findById(cartId)

            if (!cart){
                return 0
            }
            const productArray = obj.products
            if (!Array.isArray(productArray)){
                return -1
            }
            
            for (const item of productArray) {
                const existingProductIndexes = cart.products.reduce((indexes, elemento, index) => {
                    if (elemento._id.toString() === item.product.toString()) {
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
                    cart.products.push({
                        _id: item.product,
                        quantity: item.product || 1})
                }
            }
            const response = await cartsModel.updateOne(
                { _id: cartId },
                cart
            );

            if (response.modifiedCount > 0) {
                return 1
            } else {
                return -1
            }
        } catch (error){
            console.error(error)
            return error
        }
    }

    async addQuantityProductIdToCartById(cartId, productId, quantityToAdd){
        try {
            const validObjectId = /^[0-9a-fA-F]{24}$/; // Regular expresion for 24 character ObjectId
            if (!validObjectId.test(cartId)) {
                return 0
            }

            let cart = await cartsModel.findById(cartId)
            if (!cart){
                return 0
            }

            // Checks if the product exists and if not, created it with quantity 1. If exist, update the quantity
            const productIndex = cart.products.findIndex((product) => product._id.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantityToAdd;
            } else {
                cart.products.push({ _id: productId, quantity: quantityToAdd });
            }

            const response = await cartsModel.updateOne(
                { _id: cartId },
                { products: cart.products }
            );

            if (response.modifiedCount > 0) {
                return 1
            } else {
                return -1
            }
        } catch (error){
            console.error(error)
            return error
        }
    }

    async deleteAllProductsFromCartById(cartId){
        try {
            const success = await cartsModel.updateOne({ _id: cartId}, {products:[]})
            return success
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async deleteProductIdFromCartById(cartId,productId){
        try {
            const validObjectId = /^[0-9a-fA-F]{24}$/; // Regular expresion for 24 character ObjectId

            if (!validObjectId.test(cartId)) {
                return 0
            }
            let cart = await cartsModel.findById(cartId)

            if (!cart){
                return 0
            }
            const response = await cartsModel.updateOne(
                { _id: cartId },
                { $pull: { products: { _id: productId } } }
            );
    
            if (response.modifiedCount > 0) {
                return 1
            } else {
                return -1
            }
        } catch (error){
            console.error(error)
            return error
        }
    }

}

export const cartsManager = new CartsManager();