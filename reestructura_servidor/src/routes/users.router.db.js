import {Router} from 'express'
import {usersManager} from '../dao/db/managersDB/usersManagerDB.js'

const router = Router();

//Rutas de la DB
router.post('/login', async(req,res)=>{
    try{
        const {email, password} = req.body
        if(!email){
            req.session.errorLogin  = "Enter a valid email";
            return res.redirect("/views/login");
        }
        const userDb = await usersManager.findByEmail(email)
        console.log("Usuario: ",userDb);
        if (!userDb){
            req.session.errorLogin  = "This email is not registered";
            return res.redirect("/views/login");
        }
        if(email === userDb.email && password === userDb.password){
            req.session.email = userDb.email;
            req.session.first_name = userDb.first_name;
            req.session.last_name = userDb.last_name;
            if(email === "adminCoder@coder.com"){
                req.session.isAdmin = true; 
                req.session.rol = "admin"; 
            }else{
                req.session.rol = "user"; 
            }
            return res.redirect("/views/products");
        }else{
            req.session.errorLogin  = "Email and password do not match";
            return res.redirect("/views/login");
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})


router.post('/signup', async (req, res) =>{
    try{
        const {first_name, last_name, email, password} = req.body
        const requiredFields = ["first_name", "last_name","email", "password"]
        for (const field of requiredFields) {
            console.log(req.body);
            if (!req.body[field]) {
                req.session.errorSignup = `${field} is required`
                return res.redirect("/views/signup");
            }
        }
        const duplicatedEmail = await usersManager.findByEmail(email)        
        if (duplicatedEmail){
            req.session.errorSignup = "Email is already register"
            return res.redirect("/views/signup");
        }else{
            const createdUser = await usersManager.createOne(req.body);
            req.session["email"] = email;
            req.session["first_name"] = first_name;
            req.session["last_name"] = last_name;
            if(email === "adminCoder@coder.com"){
                req.session.isAdmin = true; 
                req.session.rol = "admin"; 
            }else{
                req.session.rol = "user"; 
            }
            res.redirect("/views/products");
        }
    }catch(error){
        console.log(error);
        req.session.errorSignup  = "Error when registering.";
        res.redirect("/views/signup");
        
    }
})

export default router