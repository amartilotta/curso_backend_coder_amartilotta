import {Router} from "express"
import { productsManagerDB } from "../dao/db/managersDB/productsManagerDB.js"
import { cartsManagerDB } from "../dao/db/managersDB/cartsManagerDB.js"


const router = Router()

router.get("/login", async(req,res) =>{
    try{
        const errorLogin = req.session.errorLogin || "";
        //req.session.errorMessage = "" //Limpio el mensaje de error para que no aparezca si recargo la pagina.
        res.render("login", { errorMessage: errorLogin});
    }catch(error){
        console.log(error);
        res.status(500).json({errorMessage})
    }
})

router.get('/signup', (req, res) =>{
    const errorSignup = req.session.errorSignup || "";
    console.log(errorSignup);
    delete req.session.errorSignup
    res.render("signup", { errorMessage: errorSignup });
})

router.get('/logout', (req, res) =>{
    req.session.destroy((err) => {
        if (err) {
          console.error('Logout error:', err);
        }
        res.redirect("/views/login");
    });
})

router.get("/products", async (req, res) => {
    try {
        const first_name = req.session.first_name;
        const last_name = req.session.last_name;
        const email = req.session.email;
        const rol = req.session.rol;
        if (!email || !last_name || !email){ // A veces no trae nada no se porque
            req.session.errorLogin  = "An unexpected error occurred";
            return res.redirect("/views/login");
        }
        const response = await productsManagerDB.getProducts(req.query)
        const products = response.results
        const pagesArray = Array.from({ length: response.totalPages }, (_, index) => index + 1)
        res.render("products", {products: products, pages:pagesArray, first_name:first_name, last_name:last_name, email:email, rol:rol})
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