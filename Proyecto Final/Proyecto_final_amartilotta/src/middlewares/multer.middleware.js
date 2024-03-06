import multer from "multer"
import { __dirname } from "../utils/utils.js"
import fs from "fs"
import { logger } from "../utils/winston.js"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder
        if (req.body.file_type === "profile"){
            folder = "profiles"
        }
        else if (req.body.file_type === "product"){
            folder = "products"
        }
        else {
            folder = "documents"
        }
        const path = `${__dirname}/public/uploads/${folder}/`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: (req, file, cb) => {
        const { uid } = req.params
        cb(null, `${uid}-${Date.now()}-${file.originalname}`)
    }
})

export const upload = multer({ storage })
