import {Router} from 'express'
import {productManager} from '../dao/managersFileSystem/ProductManager.js'

const router = Router();

router.get('/', async(req,res) =>{
    try{
        const products = await productManager.getProducts(req.query)
        if (products.lenth === 0){
            res.status(200).json({message: "No products found", products}) 
        } else{
        res.status(200).json({message: "Products found", products}) 
        }
    } catch(error){
        res.status(500).json({message: error}) 
    }
})

router.get('/:idProduct', async(req,res) =>{
    const {idProduct} = req.params
    try{
        const product = await productManager.getProductsById(+idProduct)
        if (!product){
            res.status(400).json({message: "Product not found with the id, try anoter id"}) 
        } else{
        res.status(200).json({message: "Products found", product}) 
        }
    } catch(error){
        res.status(500).json({message: error}) 
    }
})

router.post('/', async(req,res) =>{
    try{
        const {title,description,code,price,status,stock,category,thumbnails} = req.body;
        await productManager.addProduct(title,description,code,price,status,stock,category,thumbnails)
        res.status(200).json({message: "Product added"}) 
    } catch(error){
        return error
    }
})

router.delete('/:idProductToDelete', async(req,res) => {
    const {idProductToDelete} = req.params;
    try {
        const response = await productManager.deleteProduct(+idProductToDelete);
        if (response === -1){
            res.status(400).json({
                message: 'Product not found with the id sent'
            }) 
        } else {
            res.status(200).json({
                message: 'User deleted'
            })
        }
    } catch (error) {
        res.status(500).json({message: error}) 
    }
})

router.put('/:idProduct', async(req,res) =>{
    const {idProduct} = req.params
    console.log(idProduct)
    try {
        const response = await productManager.updateProduct(+idProduct, req.body);
        if (response === -1){
            res.status(400).json({
                message: 'Product not found with the id sent'
            }) 
        } else {
            res.status(200).json({
                message: 'Product updated'
            })
        }
    } catch (error) {
        res.status(500).json({message: error}) 
    }
})


export default router