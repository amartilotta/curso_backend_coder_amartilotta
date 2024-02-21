import BasicManager from "./basicManager.js";
import { productsModel } from "../db/models/products.model.js";

class ProductsManager extends BasicManager{
    constructor(){
        super(productsModel)
    }

    async findAllProducts(obj) {
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
}

export const productsManager = new ProductsManager();