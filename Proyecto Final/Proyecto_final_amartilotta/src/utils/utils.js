import { dirname, join } from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"

export const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../")

export async function hashData(data){
    return bcrypt.hash(data, 10)
}

export async function compareHashedData(data, hashedData){
    return bcrypt.compare(data, hashedData)
}
