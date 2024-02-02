import {Router} from "express";
import { usersManager } from "../managers/usersManager.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = Router();

// MIDDLEWARES
// router.get('/:idUser',jwtValidation, authMiddleware(['admin','premium']), async (req, res) => {
//     const {idUser} = req.params;
//     try{
//         const user = await usersManager.getById(idUser);
//         res.status(200).json({message: "User found", user});
//     } catch (error){
//         res.status(500).json({error});
//     }
// });

// passport JWT
// router.get('/:idUser', passport.authenticate("jwt", {session:false}), async (req, res) => {
//     const {idUser} = req.params;
//     console.log("req.user: ", req.user);
//     try{
//         const user = await usersManager.getById(idUser);
//         res.status(200).json({message: "User found", user});
//     } catch (error){
//         res.status(500).json({error});
//     }
// });

router.post('/', async (req, res) => {
    const {password} = req.body
    try{
        const hashedPassword = await hashData(password);
        const createdUser = await usersManager.createOne({...req.body, password:hashedPassword});
        res.status(200).json({message: "User created", createdUser});
    } catch (error){
        res.status(500).json({error});
    }
});



// router.post('/login', async(req,res) =>{
//     const {email, password} = req.body;
//     try {
//         const userDB = await usersManager.getByEmail(email);
//         if(!userDB){
//             return res.status(401).json({message: 'Invalid credentials'});
//         }
//         const isValid = await comparedData(password,userDB.password)
//         if(!isValid){
//             return res.status(401).json({message: 'Invalid credentials'});
//         }
//         return res.status(200).json({message: `Welcome ${userDB.first_name}`});
//     } catch (error) {
//         res.status(500).json({error});
//     }
// });


export default router