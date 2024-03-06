import supertest from "supertest"
import { expect } from "chai"

const requester = supertest("http://localhost:8080")

describe("products router test", () => {

    let sessionCookie
    let newProductId

    before(async()=>{        
        const user = {
            email: "usertest@gmail.com",
            password: "1234",
        }
    
        const response = await requester.post("/api/sessions/login").send(user)
        expect(response.statusCode).to.be.equal(302)
        sessionCookie = response.headers["set-cookie"][0]
    })


    it("should create a product", async () => {
        const product = {
            "title": "product test",
            "description": "product test",
            "code": "1",
            "price": 30,
            "stock": 30,
            "category": "category 1"
        }

        const response = await requester.post("/api/products").set("Cookie", [sessionCookie]).send(product)
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.product.title).to.be.equal(product.title)
        newProductId = response._body.product._id
    })

    it("should get a product", async () => {
        const response = await requester.get(`/api/products/${newProductId}`).set("Cookie", [sessionCookie])
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.product._id).to.be.equal(newProductId)
    })

    it("should delete a product", async () => {
        const response = await requester.delete(`/api/products/${newProductId}`).set("Cookie", [sessionCookie])
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.status).to.be.equal("success")
    })
})