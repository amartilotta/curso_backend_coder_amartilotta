import cartsService from "../services/carts.service.js"
import { errorMessages, successMessages, statusMessages } from "../utils/responses.js"
import customError from "../utils/customError.js"
import { logger } from "../utils/winston.js"


class CartsController{
    async createCart(req, res, next){
        try {
            const cart = await cartsService.createCart()
            return res.status(200).json({cart: cart, message:successMessages.CREATED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }        
    }

    async getCartById(req, res, next){
        try {
            const cartId = req.params.cid
            const cart = await cartsService.getCartById(cartId)
            if (!cart){
                customError.throw(errorMessages.NOT_FOUNDED, 404)
            }
            return res.status(200).json({products: cart.products, message:successMessages.FOUNDED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }      
    }

    async updateCart(req, res, next){
        try {
            const cartId = req.params.cid
            const newProducts = {products: req.body.products}
            const success = await cartsService.updateCart(cartId, newProducts)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            logger.error(error)
            next(error)
        } 
    }

    async deleteCart(req, res, next){
        try {
            const cartId = req.params.cid
            const success = await cartsService.deleteCart(cartId)
            if (!success){
                customError.throw(errorMessages.NOT_DELETED, 400)
            }
            return res.status(200).json({message:successMessages.DELETED, status:statusMessages.SUCCESS})
        } catch (error) {
            logger.error(error)
            next(error)
        } 
    }
    
    async emptyCartProducts(req, res, next){
        try {
            const cartId = req.params.cid
            const success = await cartsService.emptyCartProducts(cartId)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            next(error)
        }
    }

    async purchaseCartProducts(req, res, next){
        try {
            const cartId = req.params.cid
            const success = await cartsService.purchaseCartProducts(cartId, req.user)
            if (!success){
                customError.throw(errorMessages.NOT_PURCHASED, 400)
            }
            else {
                return res.status(200).json({message:successMessages.PURCHASED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            next(error)
        }
    }
    
    async addProductToCartById(req, res, next){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const user = req.user

            const success = await cartsService.addProductToCartById(cartId, productId, user)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
    
            return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }

    async deleteProductFromCartById(req, res, next){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid

            const success = await cartsService.deleteProductFromCartById(cartId, productId)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            else {
                return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            next(error)
        }
    }

    async updateProductQuantityInCartById(req, res, next){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            const quantity = req.body.quantity
            if (!(typeof quantity === 'number' && quantity > 0)){
                customError.throw("Quantity must be greater than 0", 400)
            }
    
            const success = await cartsService.updateProductQuantityInCartById(cartId, productId, quantity)
            if (!success){
                customError.throw(errorMessages.NOT_UPDATED, 400)
            }
            else {
                return res.status(200).json({message:successMessages.UPDATED, status:statusMessages.SUCCESS})
            }
        } catch (error) {
            next(error)
        }
    }


}

const cartsController = new CartsController()
export default cartsController
