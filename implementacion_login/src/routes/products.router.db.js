import {Router} from 'express'
import {productsManagerDB} from '../dao/db/managersDB/productsManagerDB.js'

const router = Router();

//Rutas de la DB
router.post('/', async(req,res)=>{
    const createdProduct = await productsManagerDB.createProduct(req.body);
    res.json({message: 'Product created', product: createdProduct})
})

router.get('/', async(req,res)=>{
    const response = await productsManagerDB.getProducts(req.query);
    console.log("soy el req.query",req.query);
    const info = {

    }
    res.json({message: 'Products', response})
})

router.get('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    const product = await productsManagerDB.findById(idProduct);
    res.json({message: 'Product', product})
})


router.delete('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    const deletedProduct = await productsManagerDB.deleteOne(idProduct);
    res.json({message: 'Product deleted', product: deletedProduct})
});

router.put('/:idProduct', async(req,res)=>{
    const {idProduct} = req.params;
    const product = await productsManagerDB.updateOne(idProduct,req.body);
    res.json({message: 'Product updated', product})
})

export default router