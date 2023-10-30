import {Router} from 'express'
import {cartsManagerDB} from '../dao/db/managersDB/cartsManagerDB.js'

const router = Router();

//Rutas de la DB
router.post('/', async(req,res)=>{
    try{
        const createdCart = await cartsManagerDB.createCart();
        res.status(200).json({message: 'Cart created', cart: createdCart});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }

})

router.get('/', async(req,res)=>{
    try{
        const carts = await cartsManagerDB.getCarts();
        res.status(200).json({message: 'Carts', carts});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
    
})

router.get('/:cid', async(req,res)=>{
    const {cid} = req.params;
    try{
        const cart = await cartsManagerDB.getCartById(cid);
        res.status(200).json({message: 'Cart', cart});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
})


router.delete('/:cid', async(req,res)=>{
    const {cid} = req.params;
    try{
        const deletedCart = await cartsManagerDB.deleteCartById(cid);
        res.status(200).json({message: 'Cart deleted', cart: deletedCart})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
});

router.put('/:cid', async(req,res)=>{
    const {cid} = req.params;
    try{
        const cart = await cartsManagerDB.addProductToCartById(cid,req.body);
        res.status(200).json({message: 'Cart updated', success:"true"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})

export default router