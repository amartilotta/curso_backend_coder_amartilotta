import {Router} from "express"
import { productsManagerDB } from "../dao/db/managersDB/productsManagerDB.js"
import { cartsManagerDB } from "../dao/db/managersDB/cartsManagerDB.js"


const router = Router()

router.get("/products", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const response = await productsManagerDB.getProducts(page)
        const products = response.results
        const pagesArray = Array.from({ length: response.pages }, (_, index) => index + 1)
        res.render("products", {products: products, pages:pagesArray})
    } catch (error) {
        res.status(500).json({message: error})
    }
})
export default router;