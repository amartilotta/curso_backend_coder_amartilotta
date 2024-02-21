import {Router} from 'express';
import {cartsManager} from '../managers/cartsManager.js';
import { productsManager } from "../managers/productsManager.js";


const router = Router();

//Post methods
router.post('/', async(req,res)=>{
    try{
        const createdCart = await cartsManager.createOne();
        res.status(200).json({message: 'Cart created', cart: createdCart});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
    
})

router.post("/:idCart/products/:idProduct", async (req, res) => {
    console.log("entre al fetch carst.router");
    const { idCart, idProduct } = req.params;
    try {
        const cart = await cartsManager.findById(idCart);
        if (!cart) {
            return res.status().json({ message: "Cart not found" });
        }
        
        const product = await productsManager.findById(idProduct);
        if (!product) {
        return res.status().json({ message: "Product not found" });
        }
        console.log("post segundo if carst.router");

        const productIndex = cart.products.findIndex((p) =>
        p.product.equals(idProduct)
        );
        console.log("soy el product index",productIndex);
        console.log("post tercer if carst.router");
        if (productIndex === -1) {
        cart.products.push({ product: idProduct, quantity: 1 });
        } else {
        cart.products[productIndex].quantity++;
        }
        console.log("estoy antes de actualizar");
        await cart.save();
        res.status(200).json({ message: "Product added" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
  });

// Put methods
router.put('/:cid', async(req,res)=>{
    const {cid} = req.params;
    try{
        const response = await cartsManager.addProductToCartById(cid,req.body);
        if (response === 0){
            res.status(400).json({message: "Cart not found with the id, try anoter id"})
        } else if (response === -1){
            res.status(400).json({message: "Error with the product information"})
        } else{
            res.status(200).json({message: 'Cart updated', success: "true"})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message:"error"})
    }
})

router.put('/:cid/products/:pid', async(req,res)=>{
    const {cid} = req.params;
    const {pid} = req.params;
    const { quantity } = req.body;
    const quantityValue = quantity || 1;
    try{
        const response = await cartsManager.addQuantityProductIdToCartById(cid,pid,quantityValue)
        if (response === 0){
            res.status(400).json({
                message: 'Cart not found with the id sent'
            })
        } else if (response === -1){
            res.status(400).json({
                message: 'Product not found with the id sent'
            })
        } else {
            res.status(200).json({message: 'Product quantity updated', success: "true" })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: error});
    }
})

// Get methods
router.get('/', async(req,res)=>{
    try{
        const carts = await cartsManager.getCarts();
        res.status(200).json({message: 'Carts', carts});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
    
})

router.get('/:cid', async(req,res)=>{
    const {cid} = req.params;
    try{
        const cart = await cartsManager.findById(cid);
        if (!cart){
            res.status(400).json({message: "Cart not found with the id, try anoter id"}) 
        } else{
            res.status(200).json({message: "Cart found", cart}) 
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
})

// Delete methods
router.delete('/:cid', async(req,res)=>{
    const {cid} = req.params;
    try{
        const deletedCart = await cartsManager.deleteAllProductsFromCartById(cid);
        res.status(200).json({message: 'Products deleted', success: "true"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
}); 

router.delete('/:cid/products/:pid', async(req,res)=>{
    const {cid} = req.params;
    const {pid} = req.params;
    try{
        const response = await cartsManager.deleteProductIdFromCartById(cid,pid)
        if (response === 0){
            res.status(400).json({
                message: 'Cart not found with the id sent'
            })
        } else if (response === -1){
            res.status(400).json({
                message: 'Product not found with the id sent'
            })
        } else {
            res.status(200).json({message: 'Product deleted from cart', success: "true" })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
});

// Extra method to delete a complete cart
router.delete('/:cid/cart', async(req,res)=>{
    const {cid} = req.params;
    try{
        const deletedCart = await cartsManager.deleteOne(cid);
        res.status(200).json({message: 'Cart deleted', success: "true"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
});


export default router