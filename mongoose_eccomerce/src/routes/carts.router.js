import {Router} from 'express'
import {cartsManager} from '../dao/managersFileSystem/CartsManager.js'

const router = Router();

router.post('/', async(req,res) =>{
    try{
        const products = req.body;
        if (products.lenth === 0){
            res.status(200).json({message: "No products to add"}) 
        } else{
        await cartsManager.addCart(products)
        res.status(200).json({message: "Products added to new cart"}) 
        }
    } catch(error){
        res.status(500).json({message: error}) 
    }
})

router.get('/:cid', async(req,res) =>{
    const {cid} = req.params
    try{
        const productsCart= await cartsManager.getCartById(+cid)
        if (!productsCart){
            res.status(400).json({message: "Cart not found with the id, try anoter id"}) 
        } else{
            res.status(200).json({message: "Cart found", productsCart}) 
        }
    } catch(error){
        console.log("al final rompi")
        res.status(500).json({message: error}) 
    }
})

router.post('/:cid/product/:pid', async(req,res) =>{
    const {cid,pid} = req.params;
    try{
        const response = await cartsManager.addProductToCartById(+cid,+pid)
        if (response === -1){
            res.status(400).json({
                message: 'Cart not found with the id sent'
            })
        } else{
            res.status(200).json({message: "Product added to cart"})
        }
    } catch(error){
        res.status(500).json({message: error}) 
    }
})


export default router