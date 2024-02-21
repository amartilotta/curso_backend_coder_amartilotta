import {Router} from 'express'
import {productsManager} from '../managers/productsManager.js'

const router = Router();

//Rutas de la DB
router.post('/', async(req,res)=>{
    try{
        const requiredFields = ["name", "description", "price"]
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Field ${field} is required` })
            }
        }
        if (!req.body["stock"]) {
            delete req.body.stock;
          }
        const createdProduct = await productsManager.createOne(req.body);
        res.status(200).json({message: 'Product created', success: createdProduct})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})

router.get('/', async(req,res)=>{
    try{
        const response = await productsManager.findAllProducts(req.query);
        const info = {
            status: "success",
            ...response,
            totalProducts: response.count,
            resultsAmount: response.results.length,
            payload: response.results,
        }
        delete info.results; //why?
        console.log("products router el req: ",req);
        
        res.status(200).json({message: 'Products', info })
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})


router.get('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    try{
        const product = await productsManager.findById(idProduct);
        res.status(200).json({message: 'Product', product})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})


router.delete('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    try{
        const deletedProduct = await productsManager.deleteOne(idProduct);
        res.status(200).json({message: 'Product deleted', deletedProduct, success: "true"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
});

router.put('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    try{
        const updatedProduct = await productsManager.updateOne(idProduct,req.body);
        res.status(200).json({message: 'Product updated', updatedProduct, success:"true"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
})

export default router