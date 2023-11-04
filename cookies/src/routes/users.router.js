import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";

const router = Router();

/* router.post('/', (req, res) =>{
    const {email, password} = req.body;
    req.session["email"] = email;
    res.send("Usuario loggeado");
}) */

router.post('/login', async(req, res) =>{
    const {email, password} = req.body;
    const userDb = await usersManager.findByEmail(email)
    if (!userDb){
        return res.json({error: "This email does not exist"})
    }
    req.session["email"] = email;
    req.session["first_name"] = userDb.first_name;
    req.session["isAdmin"] = true;
    res.redirect("/home");
})

router.post('/signup', async (req, res) =>{
    const createdUser = await usersManager.createOne(req.body)
    res.status(200).json({ message: 'User created', createdUser})
})

export default router