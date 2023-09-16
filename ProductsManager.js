import fs from "fs"; // Importo el modulo 'fs' para utilizarlo.

const path = "./products.json"; // Declaro el path del archivo .JSON donde estan la listas de productos a trabajar.

class ProductsManager {
    /**
    * This Function read and retunrs a product list from Json products.json.
    * @param {Object} queryObj - Object that could contain consultation parameteres, like 'limit'. If no parameter is specified, the object will be empty.
    * @returns {Promise<Array<Product>>}A promise that returns a product list. In case there is no product in the read file, returns an empty list.
    */
    
    async getProducts(queryObj){
    
        const {limit} = queryObj
        try {
            if (fs.existsSync(path)){
                const productsFile = await fs.promises.readFile(path, "utf-8"); //save the products 
                const productsArray = JSON.parse(productsFile)
                return limit ? productsArray.slice(0, limit) : productsArray
            } else {
                return [];
            }
        } catch (error){
            console.error("Error al leer el archivo JSON:", error);
            return error;
        }
    }

    async getProductsById(id){
        try{
            const productsFile = await this.getProducts({});
            const product = productsFile.find((p) => p.id === id);
            return product;
        } catch (error){
        return error;
        }
    }
}

export const productManager = new ProductsManager(); 