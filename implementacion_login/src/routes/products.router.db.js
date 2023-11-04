import {Router} from 'express'
import {productsManagerDB} from '../dao/db/managersDB/productsManagerDB.js'

const router = Router();

//Rutas de la DB
router.post('/', async(req,res)=>{
    try{
        const requiredFields = ["title", "description", "code", "price", "stock", "category"]
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Field ${field} is required` })
            }
        }
        const createdProduct = await productsManagerDB.createProduct(req.body);
        res.status(200).json({message: 'Product created', success: createdProduct})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})

router.get('/', async(req,res)=>{
    try{
        const response = await productsManagerDB.getProducts(req.query);
        const info = {
            status: "success",
            ...response,
            totalProducts: response.count,
            resultsAmount: response.results.length,
            payload: response.results,
        }
        delete info.results;
        
        res.status(200).json({message: 'Products', info })
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})


router.get('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    try{
        const product = await productsManagerDB.getProductById(idProduct);
        res.status(200).json({message: 'Product', product})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})


router.delete('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    try{
        const deletedProduct = await productsManagerDB.deleteProductById(idProduct);
        res.status(200).json({message: 'Product deleted', deletedProduct, success: "true"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
});

router.put('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    try{
        const updatedProduct = await productsManagerDB.updateProduct(idProduct,req.body);
        res.status(200).json({message: 'Product updated', updatedProduct, success:"true"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})

export default router