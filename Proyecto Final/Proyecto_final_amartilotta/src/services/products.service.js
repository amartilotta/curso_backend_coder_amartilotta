import productsDao from "../dao/products.mongo.js"
import usersService from "./users.service.js"
import { sendMail } from "../utils/nodemailer.js"


class ProductsService{
    async getProducts(baseUrl, page=1, limit=10, sort={}, query={} ){
        const options = { page, limit, sort, lean: true}
        const result = await productsDao.getProductsPage(query, options)
        return {
            totalPages: result.totalPages,
            totalProducts: result.totalDocs,
            resultsAmount: result.docs.length,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.hasPrevPage ? page-1 : null,
            nextPage: result.hasNextPage ? page+1 : null,
            page: page,
            prevLink: result.hasPrevPage ? 
                `${baseUrl}?page=${page-1}` + `${limit ? `&limit=${limit}`:""}` + `${params.sort ? `&sort=${params.sort}`:""}` + `${params.category ? `&category=${params.category}`:""}` + `${params.stock ? `&stock=${params.stock}`:""}`
                : null,
            nextLink: result.hasNextPage ? 
                `${baseUrl}?page=${page+1}` + `${limit ? `&limit=${limit}`:""}` + `${params.sort ? `&sort=${params.sort}`:""}` + `${params.category ? `&category=${params.category}`:""}` + `${params.stock ? `&stock=${params.stock}`:""}`
                : null,
            payload: result.docs
        }
    }

    async getProductById(productId){
        return productsDao.getById(productId)
    }

    async getProductById(productId){
        return productsDao.getById(productId)
    }

    async createProduct(productData){
        return productsDao.createOne(productData)
    }

    async deleteProduct(productId, user){
        const product = productsDao.getById(productId)
        if (user.role === "premium" && product.owner !== user.email){
            return false
        }
        const productOwner = await usersService.getUserByEmail(product.owner)
        if (productOwner.role === "premium"){
            const mailContent = `
                <h2>Product: ${product.title}</h2>
                ${user.email} has removed the product
            `
            sendMail(productOwner.email, "a product that belonged to you has been deleted", mailContent)
        }

        return productsDao.deleteOne(productId)
    }

    async updateProduct(productId, newData, user){
        if (user.role === "premium" && product.owner !== user.email){
            return false
        }
        return productsDao.updateOne(productId, newData)
    }
}

const productsService = new ProductsService()
export default productsService
