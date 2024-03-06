import { Router } from "express"
import { roleRequired, loginRequired } from "../middlewares/auth.middleware.js"
import controller from "../controllers/carts.controller.js"


const router = Router()

//post

router.post("/", loginRequired, controller.createCart)

router.post("/:cid/product/:pid", loginRequired, roleRequired("user", "premium"), controller.addProductToCartById)

router.post("/:cid/purchase", loginRequired, controller.purchaseCartProducts)

// get 

router.get("/:cid", loginRequired, controller.getCartById)

// put

router.put("/:cid", loginRequired, controller.updateCart)

router.put("/:cid/product/:pid", loginRequired, controller.updateProductQuantityInCartById)

// delete

router.delete("/:cid", loginRequired, controller.emptyCartProducts)

router.delete("/:cid/product/:pid", loginRequired, controller.deleteProductFromCartById)



export default router