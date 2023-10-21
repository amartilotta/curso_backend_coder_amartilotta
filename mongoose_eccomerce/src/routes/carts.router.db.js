import {Router} from 'express'
import {cartsManagerDB} from '../dao/db/managersDB/cartsManagerDB.js'

const router = Router();

//Rutas de la DB
router.post('/', async(req,res)=>{
    const createdCart = await cartsManagerDB.addCart(req.body);
    res.json({message: 'Cart created', cart: createdCart})
})

router.get('/', async(req,res)=>{
    const carts = await cartsManagerDB.getCarts();
    res.json({message: 'Carts', carts})
})

router.get('/:idCart', async(req,res)=>{
    const {idCart} = req.params;
    const cart = await cartsManagerDB.getCartById(idCart);
    res.json({message: 'Cart', cart})
})


router.delete('/:idCart', async(req,res)=>{
    const {idCart} = req.params;
    const deletedCart = await cartsManagerDB.deleteCartById(idCart);
    res.json({message: 'Cart deleted', cart: deletedCart})
});

router.put('/:idCart', async(req,res)=>{
    const {idCart} = req.params;
    const cart = await cartsManagerDB.addProductToCartById(idCart,req.body);
    res.json({message: 'Cart updated', cart})
})

export default router