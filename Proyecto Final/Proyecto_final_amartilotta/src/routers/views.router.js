import { Router } from "express"
import { loginRequired, roleRequired } from "../middlewares/auth.middleware.js"
import controller from "../controllers/views.controller.js"


const router = Router()


// get
router.get("/", loginRequired, controller.getProducts)

router.get("/login", controller.login)

router.get("/signup", controller.signup)

router.get("/profile", loginRequired, controller.getProfile)

router.get("/products", loginRequired, roleRequired("user", "premium"), controller.getProducts)

router.get("/carts/:cid", loginRequired, roleRequired("user", "premium"), controller.getCartById)

router.get("/restorePassword/:token", loginRequired, controller.restorePassword)

export default router