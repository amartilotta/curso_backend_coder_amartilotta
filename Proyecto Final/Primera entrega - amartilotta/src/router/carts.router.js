import {Router} from 'express'
import {carts} from '../Carts.js'

const router = Router();

router.post('/', async(req,res) =>{
    try{
        const {products} = req.body;
        await carts.addCarrito(products)
        res.status(200).json({message: "Product added"}) 
    } catch(error){
        return error
    }
})

router.get('/:cid', async(req,res) =>{
    const {cid} = req.params
    try{
        const productsCarrito = await carts.getProductsById(+cid)
        if (!productsCarrito){
            res.status(400).json({message: "Carrito not found with the id, try anoter id"}) 
        } else{
        res.status(200).json({message: "Carrito found", productsCarrito}) 
        }
    } catch(error){
        res.status(500).json({message: error}) 
    }
})

router.post('/:cid/product/:pid', async(req,res) =>{
    try{
        const {title,description,code,price,status,stock,category,thumbnails} = req.body;
        await carts.addProduct(title,description,code,price,status,stock,category,thumbnails)
        res.status(200).json({message: "Product added to carts"}) 
    } catch(error){
        return error
    }
})


export default router