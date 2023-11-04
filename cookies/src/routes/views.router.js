import { Router } from "express";

const router = Router();

router.get('/', (req, res) =>{
    res.render('login')
})

router.get('/signup', (req, res) =>{
    res.render('signup')
})
router.get('/home', (req, res) =>{
    //console.log(req);
    const {first_name, email} = req.session
    console.log(first_name);
    res.render('home', {first_name, email})
})

export default router;