import {Router} from "express"
import { productsManagerDB } from "../dao/db/managersDB/productsManagerDB.js"
import { cartsManagerDB } from "../dao/db/managersDB/cartsManagerDB.js"


const router = Router()

router.get("/products", async (req, res) => {
    try {
        const response = await productsManagerDB.getProducts(req.query)
        const products = response.results
        const pagesArray = Array.from({ length: response.totalPages }, (_, index) => index + 1)
        res.render("products", {products: products, pages:pagesArray})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/carts/:cid", async (req, res) => {
    const {cid} = req.params
    try {
        const cart = await cartsManagerDB.getCartById(cid)
        const productsCart = cart.products
        if (!productsCart){
            res.status(400).json({message: "Cart not found with the id or is empty, try anoter id"}) 
        } else{
            res.render("cartProducts", {products: productsCart})
        }
        } catch (error) {
        res.status(500).json({message: error})
    }
})
export default router;