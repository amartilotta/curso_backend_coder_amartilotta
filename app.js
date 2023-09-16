import express from 'express';
import {productManager} from './ProductsManager.js'
const app = express()

//Get all products.
app.get('/api/products', async(req,res) =>{
    try{
        const products = await productManager.getProducts(req.query);
        if (!products.length){
            return res.status(200).json({
                message: "No products"
            });
        }
        res.status(200).json({ message: "Products found", products });
    } catch (error){
        res.status(500).json({
            message: error.message
        })
    }
});
//Get products by specific ID.
app.get('/api/products/:idProduct', async(req,res)=>{
    const idProduct = req.params.idProduct //Del objeto 'req', y su propiedad 'params' (provenientes de 'Express.js'), obtengo el id del producto solicitado mediante el protocolo HTTP
    //const {idProduct} = req.params // Otra manera de extraer en una variable el valor id del parametro 'idProduct' de 'req.params' y asignarlo a una variable llamada 'idProduct'
    try {
        const product = await productManager.getProductsById(+idProduct) // idProduct lo almacenamos como un String, con el '+', lo transformamos a int, que es el tipo de dato que necesita pasarse por parametro en el método 'getProductsById'.
        if(!product){
            return res.status(400).json({message: "Product not found with the id, try anoter id"});
        }
        res.status(200).json({ message: "Product found", product})
    } catch (error){
        res.status(500).json({ message: error.message});
    }
});

//port call
app.listen(8000, () => {
    console.log("Escuchando al puerto 8000")

});

//Recomendado: instalar en el browser de visualizacion la extension 'JSON Formatter' para una mejor visualizacion de la respuesta de la app.