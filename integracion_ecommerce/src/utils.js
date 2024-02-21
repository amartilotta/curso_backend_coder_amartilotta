import {dirname} from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'jwtSECRET'

export const __dirname = dirname(fileURLToPath(import.meta.url));

// bcrypt
export const hashData = async (data) =>{
    return bcrypt.hash(data,10)
}

export const comparedData = async (data, hashedData) => {
    return bcrypt.compare(data,hashedData)
};

export const generateToken = (user) =>{
    const token = jwt.sign(user,JWT_SECRET, { expiresIn: 300});
    return token;
}