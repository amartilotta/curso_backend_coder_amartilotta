import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";
import { cartsManager } from "../managers/cartsManager.js";
import passport from "passport";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersManager.findAll();
    res.status(200).json({ message: "Users", users });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/signup", passport.authenticate("signup", {
  successRedirect:"/products",
  failureRedirect:"/signup",
  })
); 

router.post("/login", passport.authenticate("login",{
  successRedirect:"/products",
  failureRedirect:"/login",
  })
); 

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await usersManager.findByEmail(email);
    res.status(200).json({ message: "User", user });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
