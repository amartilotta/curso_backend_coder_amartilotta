import { productsModel } from "../models/products.model.js";

class ProductsManager {

    async getProducts(obj){
        try {
            const { page = 1, limit =10 , sort:sortPrice, ...queryFilter} = obj
            const options = { page, limit, sort:{price: sortPrice === "asc"? 1 : -1}, lean:true}
            const result = await productsModel.paginate(queryFilter,options)
            
            const prevUrl = result.hasPrevPage?  `http://localhost:8080/views/products?page=${result.prevPage}` + `${limit ? `&limit=${limit}`:""}` + `${sortPrice ? `&sort=${sortPrice}`:""}` + `${queryFilter.category ? `&category=${queryFilter.category}`:""}` + `${queryFilter.stock ? `&stock=${queryFilter.stock}`:""}`: null;
            const nextUrl = result.hasNextPage?  `http://localhost:8080/views/products?page=${result.nextPage}`  + `${limit ? `&limit=${limit}`:""}` + `${sortPrice ? `&sort=${sortPrice}`:""}` + `${queryFilter.category ? `&category=${queryFilter.category}`:""}` + `${queryFilter.stock ? `&stock=${queryFilter.stock}`:""}`: null;
            return {
                results: result.docs,
                count: result.totalDocs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: prevUrl,
                nextLink: nextUrl
            };
        } catch (error){
            console.error(error);
            res.status(500).json({status: "error"})
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
            const response = await productsModel.findByIdAndUpdate(
            { _id: id },
            { $set: obj }
            );
            console.log(response);
            return response
        } catch (error) {
            console.error(error);
            return error
        }
    }

    async deleteProductById(id){
        try {
            const response = await productsModel.findByIdAndDelete(id)
            return response
        } catch (error) {
            console.error(error)
                return error
        }
    }
}

export const productsManagerDB = new ProductsManager()