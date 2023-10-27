import { productsModel } from "./models/products.model.js";

class ProductsManager {

    async getProducts(page=1, limit=10,sort={}, query={}){
        try {
            const options = { page, limit, sort, lean:true}
            const result = await productsModel.paginate(query,options)

            return {
                results: result.docs,
                count: result.totalDocs,
                pages: result.totalPages,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
            };
        } catch (error){
            console.error(error);
            return error
        }
    }

    async getProductById(id){
        try{
        const response = await productsModel.findById(id)
        return response
        } catch (error){
            console.error(error);
            return error
        }
    }

    async createProduct(obj){
        try{
            const response = await productsModel.create(obj)
            return response

        } catch (error){
            console.error(error)
            return error
        }
    }

    async updateProduct(id, obj){
        try{
            const response = await productsModel.updateOne(
            { _id: id },
            { $set: obj }
            );
            const success = result.matchedCount > 0
            return success
        } catch (error) {
            console.error(error);
            return error
        }
    }

    async deleteProduct(id){
        try {
            const response = await productsModel.findByIdAndDelete(id)
            const success = result.deletedCount > 0
            return success
        } catch (error) {
            console.error(error)
                return error
        }
    }
}

export const productsManagerDB = new ProductsManager()