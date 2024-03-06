import cartsDao from "../dao/carts.mongo.js"
import ordersDao from "../dao/orders.mongo.js"
import productsDao from "../dao/products.mongo.js"
import { v4 as uuidv4 } from "uuid"
import { sendMail } from "../utils/nodemailer.js"


class CartsService{
    async getCartById(cartId){
        return cartsDao.getById(cartId)
    }

    async createCart(){
        return cartsDao.createOne({})
    }
    
    async deleteCart(cartId){
        return cartsDao.deleteOne(cartId)
    }

    async updateCart(cartId, newProducts){
        return cartsDao.updateOne(cartId, newProducts)
    }

    async emptyProducts(cartId){
        return cartsDao.updateOne(cartId, {products:[]})
    }

    async emptyCartProducts(cartId){
        return cartsDao.updateOne(cartId, {products:[]})
    }

    async addProductToCartById(cartId, productId, user){

        let success = false
        
        const product = await productsDao.getById(productId)
        if (!product){  // Se valida que el producto exista
            return success
        }
        
        if (user.role === "premium" && product.owner === user.email){
            return success
        }

        const cart = await cartsDao.getById(cartId, false)
        if (!cart){
            return success
        }

        const productIndex = cart.products.findIndex(product => product.product._id.toString() === productId)
        if (productIndex===-1 && product.stock >= 1){
            cart.products.push({
                product: productId,
                quantity: 1
            })
        }
        else if (productIndex!==-1 && product.stock > cart.products[productIndex].quantity){
            cart.products[productIndex].quantity++
        }
        else {
            return success
        }

        await cartsDao.updateOne(cartId, cart)
        success = true
        return success
    }

    async deleteProductFromCartById(cartId, productId){
        let success = false
        
        const cart = await cartsDao.getById(cartId, false)
        if (!cart){
            return success
        }

        const productIndex = cart.products.findIndex(product => product.product._id.toString() === productId)
        if (productIndex!==-1){
            cart.products.splice(productIndex, 1)
        }
        else {
            return success
        }

        await cartsDao.updateOne(cartId, cart)
        success = true
        return success
    }

    async updateProductQuantityInCartById(cartId, productId, quantity){
        let success = false

        const product = await productsDao.getById(productId)
        if (!product){  // Se valida que el producto exista
            return success
        }

        const cart = await cartsDao.getById(cartId, false)
        if (!cart){
            return success
        }

        const productIndex = cart.products.findIndex(product => product.product._id.toString() === productId)
        if (productIndex===-1){
            return success
        }
        else if (productIndex!==-1 && product.stock > quantity){
            cart.products[productIndex].quantity = quantity
        }
        else {
            return success
        }

        await cartsDao.updateOne(cartId, cart)
        success = true
        return success
    }

    async purchaseCartProducts(cartId, user){
        const cart = await cartsDao.getById(cartId, false)
        const purchaseProducts = []
        const updatedCartProducts = []

        cart.products.forEach(cartProduct => {
            if(cartProduct.quantity <= cartProduct.product.stock){
                purchaseProducts.push({
                    _id: cartProduct.product._id,
                    title: cartProduct.product.title,
                    quantity: cartProduct.quantity,
                    unitPrice: cartProduct.product.price
                })
                const updatedStock = cartProduct.product.stock - cartProduct.quantity
                productsDao.updateOne(cartProduct.product._id, {stock: updatedStock})
            }
            else{
                updatedCartProducts.push(cartProduct)
            }
        })

        // Actualización del carrito
        cart.products = updatedCartProducts
        cart.save()

        const orderData = {
            code: uuidv4(),
            purchase_datetime: new Date(),
            products: purchaseProducts,
            amount: purchaseProducts.reduce(
                (total, product) => total + product.unitPrice * product.quantity, 0
            ),
            purchaser: user.email
        }

        const order = await ordersDao.createOne(orderData)
        this.#sendPurchaseMail(order)
        return true
    }

    async #sendPurchaseMail(order){
        const mailContent = `
            <h2>Order: ${order.code}</h2>
            <ul>
                <li><b>Purchaser:</b> ${order.purchaser}</li>
                <li><b>Time:</b> ${order.purchase_datetime}</li>
                <li><b>Products:</b>
                    ${order.products.map(
                        product => `${product.quantity}X <b>${product.title}</b>: $${product.quantity*product.unitPrice}`
                    ).join(' - ')}
                </li>
                <li><b>Total:</b> $${order.amount}</li>
            </ul>
        `
        sendMail(order.purchaser, `order: ${order.code}`, mailContent)
    }
}

const cartsService = new CartsService()
export default cartsService
