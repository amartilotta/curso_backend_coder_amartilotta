import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";
import { productsManager } from "../managers/productsManager.js";

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
        res.redirect("/login");
    });
})

router.get("/products", async (req, res) => {
    try {
        const first_name = req.user.first_name;
        const last_name = req.user.last_name;
        const email = req.user.email;
        // Modifique esto por el req user ya que no me llegaban los datos que guardaba en la req.session
        const role = req.user.role;
        const cart = req.user.cart._id;
        if (!email || !last_name || !email){ // A veces no trae nada no se porque
            req.session.errorLogin  = "An unexpected error occurred";
            return res.redirect("/login");
        }
        // if(email === "adminCoder@coder.com"){ //Tuve que mover aca la logica para definir el rol
        //     rol = "admin"; 
        // }else{
        //     rol = "user"; 
        // }
        //console.log("SOY EL REQ DEL VIEWS",req);
        const response = await productsManager.findAllProducts(req.query)
        const products = response.results
        //console.log(response);
        const pagesArray = Array.from({ length: response.totalPages }, (_, index) => index + 1)
        res.render("products", {products: products, pages:pagesArray, first_name:first_name, last_name:last_name, email:email, role:role,cart:cart})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/carts/:cid", async (req, res) => {
    console.log("entre al vies router carrito");
    const {cid} = req.params
    try {
        const cart = await cartsManager.findById(cid)

        console.log("soy el carrito",cart);
        const productsCart = cart.products
        console.log("soy el products cart",productsCart);
        let listaNueva = []
        for (const producto of productsCart) {
            listaNueva.push({name:producto.product.name,quantity:producto.quantity})
        }
        console.log(listaNueva);
        if (!productsCart){
            res.status(400).json({message: "Cart not found with the id or is empty, try anoter id"}) 
        } else{
            console.log({products: productsCart});
            res.render("cartProducts", {products: listaNueva})
        }
        } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get("/createproduct", (req, res) => {
    res.render("createProduct");
  });

export default router;