import fs from 'fs'

class CartsManager{
    constructor(){
        this.path = './carrito.json'
        this.carts = []
    }

    async addCart(products){
        try{
            const carts = await this.getCarts();
            let id;
            if (!carts.length){
                id = 1
            } else {
                id = carts[carts.length -1 ].id +1
            }
            const newCart = {
                products,
            };
            carts.push({id,...newCart});
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        } catch (error){
            console.log("Error add cart: ", error );
            return error
        }
    }

    async getCarts(){
        try{
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, 'utf-8')
                const cartsArray = JSON.parse(carts)
                return cartsArray;
            } else {
                return this.carts
            }
        } catch (error){
            console.log("Error getting carts: ", error );
            return error
        }
    }

    async getCartById(idCart){
        try{
            if(fs.existsSync(this.path)){
                const carts = await this.getCarts();
                const cart = carts.find((c) => c.id === idCart);
                return cart.products;
            } 
        } catch (error){
            console.log("Error getting cart: ", error );
            return error
        }
    }

    async addProductToCartById(idCart,idProduct){
        try {
            const allCarts = await this.getCarts();
            const cartIndex = allCarts.findIndex((cart) => cart.id === idCart);

            //b nm
            if (cartIndex === -1) { 
                return -1;
            }
            // Find the product in the cart
            const productIndex = allCarts[cartIndex].products.findIndex((p) => p.id === idProduct);

            // If the product does not exist, a new product is created with the id passed by parameter
            if (productIndex === -1) {
                allCarts[cartIndex].products.push({"id":idProduct, "quantity":1})
                await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
                return 1;
            }

            // Increase the quantity of the product by 1
            allCarts[cartIndex].products[productIndex].quantity += 1;
            await fs.promises.writeFile(this.path, JSON.stringify(allCarts, null, 2));
            return 1;

        } catch (error) {
            console.log("Error adding a product: ", error );
            return error
            
        }


    }
}

export const cartsManager = new CartsManager(); 