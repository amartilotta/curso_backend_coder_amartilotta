import { Router } from "express"
import { roleRequired, loginRequired } from "../middlewares/auth.middleware.js"
import { validateBodyParams } from "../middlewares/validation.middleware.js"
import controller from "../controllers/products.controller.js"


const router = Router()

// post 

router.post(
    "/",
    loginRequired,
    roleRequired("admin", "premium"),
    validateBodyParams([{"title":"string"}, {"description":"string"}, {"code":"string"}, {"price":"number"}, {"stock":"number"}, {"category":"string"}]),
    controller.createProduct
)

// get 
router.get("/", loginRequired, controller.getProducts)

router.get("/mocking-products", loginRequired, controller.getMockingProducts)

router.get("/:pid", loginRequired, controller.getProductById)

// put 

router.put("/:pid", loginRequired, roleRequired("admin", "premium"), controller.updateProduct)

// delete

router.delete("/:pid", loginRequired, roleRequired("admin", "premium"), controller.deleteProduct)

export default router