import {Router} from "express";
import passport from "passport";
import { usersManager } from "../managers/usersManager.js";
import { generateToken, hashData, comparedData} from "../utils.js";

const router = Router();


router.post('/signup', async (req, res) => {
  const {password, email, first_name, last_name} = req.body;
  if(!first_name || !last_name || !email || !password){
    res.status(400),json( {message: "All fields are required"});
  }
  try{
    const userDB = await usersManager.getByEmail(email);

    if(userDB){
      return res.status(401).json({message: "User exists"});
    }

    const hashedPassword = await hashData(password);
    const createdUser = await usersManager.createOne({
      ...req.body, 
      password:hashedPassword
      });
    res.status(200).json({message: "User created", createdUser});
  } catch (error){
    res.status(500).json({error});
  }
});

router.post('/login', async(req,res) =>{
  const {email, password} = req.body;
  try {
      const userDB = await usersManager.getByEmail(email);
      if(!userDB){
          return res.status(401).json({message: 'Invalid credentials'});
      }
      const isValid = await comparedData(password,userDB.password)
      if(!isValid){
          return res.status(401).json({message: 'Invalid credentials'});
      }
      const token = generateToken({ 
        email, 
        first_name: userDB.first_name,
        role: userDB.role,
      });

      return res
        .status(200)
        //No esta sucediendo lo de pasar el token por las cookies, revisar luego porque
        .cookie("token", token,{ expires: new Date(Date.now() + 900000), httpOnly: true })//Almaceno la info del token en las cookies y le pongo inaccesbilidad por otros medios que no sea una request de http
        .json({message: `Welcome ${userDB.first_name}`, token});
  } catch (error) {
      res.status(500).json({error});
  }
});

// Passport signup - login

// router.post("/signup", passport.authenticate("signup", {
//     successRedirect:"/home",
//     failureRedirect:"/error",
//     })
// ); 

// router.post("/login", passport.authenticate("login",{
//     successRedirect:"/home",
//     failureRedirect:"/error",
//     })
// ); 

// GITHUB

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github', 
  passport.authenticate('github', { 
    //successRedirect:"/home",
    failureRedirect:"/error",
    }),
    function(req,res){console.log("Redirección exitosa a /home");
    res.redirect('/home');}
);

export default router