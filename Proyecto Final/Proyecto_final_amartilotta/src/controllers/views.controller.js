import usersService from "../services/users.service.js"
import productsService from "../services/products.service.js"
import cartsService from "../services/carts.service.js"
import { logger } from "../utils/winston.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"


class ViewsController{
    async getProducts(req, res, next){
        try {
            const page = parseInt(req.query.page) || 1
            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
            const response = await productsService.getProducts(baseUrl, page)
            const products = response.payload
            const pagesArray = Array.from({ length:response.totalPages }, (_, index) => index + 1)
            return res.render("products", {products:products, pages:pagesArray, userData: req.user})
        } catch (error) {
            next(error)
        }
    }
    
    async getProfile(req, res, next){
        try {
            const message = req.query.message
            const user = await usersService.getUserByEmail(req.user.email)
            return res.render("userProfile", {user, message})
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next){
        try {
            return res.render("login")
        } catch (error) {
            next(error)
        }
    }

    async signup(req, res, next){
        try {
            return res.render("signup")
        } catch (error) {
            next(error)
        }
    }

    async getCartById(req, res, next){
        try {
            const cartId = req.params.cid
            const cart = await cartsService.getCartById(cartId)
            return res.render("cartProducts", {cartId: cartId, products: cart.products})
        } catch (error) {
            next(error)
        }
    }

    async restorePassword(req, res, next){
        try {
            const token = req.params.token
            jwt.verify(token, config.appSecretKey, (err, decoded) => {
                if (err) {
                  return res.redirect(`/profile?message=${"Restore password link expired"}`);
                }

                const userId = decoded.userId
                return res.render("passwordRestore", {userId})
            })
        } catch (error) {
            next(error)
        }
    }
}

const viewsController = new ViewsController()
export default viewsController
