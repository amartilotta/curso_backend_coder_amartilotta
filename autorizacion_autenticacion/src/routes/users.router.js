import {Router} from "express";
import { usersManager } from "../managers/usersManager.js";
import { hashData, comparedData} from "../utils.js";
import passport from "passport";

const router = Router();

router.get('search/:idUser', async (req, res) => {
    const {idUser} = req.params;
    console.log(idUser);
    try{
        const user = await usersManager.getById(idUser);
        console.log(user);
        console.log("hola");
        res.status(200).json({message: "User found", user});
    } catch (error){
        res.status(500).json({error});
    }
});

router.get('/search/email', async (req, res) => {
    try{
        console.log("hola");
        const user = await usersManager.getByEmail("agu.com@hotmail.com");
        res.status(200).json({message: "User found", user});
    } catch (error){
        res.status(500).json({error});
    }
});

// router.post('/', async (req, res) => {
//     const {password} = req.body
//     try{
//         const hashedPassword = await hashData(password);
//         const createdUser = await usersManager.createOne({...req.body, password:hashedPassword});
//         res.status(200).json({message: "User created", createdUser});
//     } catch (error){
//         res.status(500).json({error});
//     }
// });

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


// signup - login - passaport

// router.post("/signup", passport.authenticate("signup"), (req, res) =>{ //La funcion req,res es para decirle que hacer despues de que se efectua la autenticacion
//     res.redirect("/home");
// }); 

// router.post("/login", passport.authenticate("login"), (req, res) =>{ //La funcion req,res es para decirle que hacer despues de que se efectua la autenticacion
//     res.redirect("/home");
// }); 

router.post("/signup", passport.authenticate("signup", {
    successRedirect:"/home",
    failureRedirect:"/error",
    })
); 

router.post("/login", passport.authenticate("login",{
    successRedirect:"/home",
    failureRedirect:"/error",
    })
); 

// GITHUB

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github', 
  passport.authenticate('github', { 
    successRedirect:"/home",
    failureRedirect:"/error",
    }),
    function(req,res){console.log("Redirección exitosa a /home");
    res.redirect('/home');}
);

export default router