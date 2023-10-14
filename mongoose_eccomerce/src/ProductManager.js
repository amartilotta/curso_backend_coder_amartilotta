import fs from 'fs'

class ProductManager{
    constructor(){
        this.path = './products.json'
        this.products = []
    }
    
    async addProduct(title,description,price,code,status=true,stock,category,thumbnails){
        try{
            const products = await this.getProducts({});
            let id;
            if (!products.length){
                id = 1
            } else {
                id = products[products.length -1 ].id +1
            }
            const newProduct = {
                title,
                description,
                price,
                code,
                status,
                stock,
                code,
                category,
                thumbnails,
            };
            console.log(products)
            products.push({id,...newProduct});
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return {id,...newProduct};
        } catch (error){
            return error
        }
    }

    async getProducts(queryObj){
        const {limit} = queryObj
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8')
                const productsArray = JSON.parse(products)
                return limit ? productsArray.slice(0,limit) :productsArray;
            } else {
                return this.products
            }
        } catch (error){
            return error
        }
    }

    async getProductsById(idProduct){
        try {
            if(fs.existsSync(this.path)){
                const products = await this.getProducts({});
                const product = products.find((p) => p.id === idProduct);
                return product
            }
        } catch (error) {
            
        }
    }

    async deleteProduct(idProduct){
        try{
            const products = await this.getProducts({});
            const productToDelete = products.find(p=>p.id === idProduct)
            if(!productToDelete){
                return -1
            }
            const newArrayProducts = products.filter((p)=>p.id !== idProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts, null, 2))
            return 1
        } catch (error){
            return error
        }
    }

    async updateProduct(idProduct, updatedProduct) {
        try {
            const products = await this.getProducts({});
            const productIndex = products.findIndex((p) => p.id === idProduct);
            if (productIndex === -1) {
                return -1
            } 
            const product = products[productIndex]
            products[productIndex] = {...product, ...updatedProduct}
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            return 1
          } catch (error) {
            return error;
        }
    }
}

export const productManager = new ProductManager(); 

