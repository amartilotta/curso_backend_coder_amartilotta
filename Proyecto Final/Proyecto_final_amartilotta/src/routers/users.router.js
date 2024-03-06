import { Router } from "express"
import { loginRequired } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import controller from "../controllers/users.controller.js"


const router = Router()

// post 

router.post("/password/restore/:uid", loginRequired, controller.restorePassword)

router.post("/:uid/documents", loginRequired, upload.single("document"), controller.uploadDocument)

// get

router.get("/", loginRequired, controller.getUsersPublicData)

router.get("/password/restore/mail/:uid", loginRequired, controller.getRestorePasswordMail)

router.get("/premium/:uid", loginRequired, controller.togglePremiumRole)

// delete

router.delete("/", loginRequired, controller.deleteInactiveUsers)

export default router