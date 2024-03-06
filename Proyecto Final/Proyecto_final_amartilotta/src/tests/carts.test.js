import supertest from "supertest"
import { expect } from "chai"

const requester = supertest("http://localhost:8080")

describe("carts router test", () => {

    let sessionCookie
    let newcartId

    before(async()=>{        
        const user = {
            email: "usertest@gmail.com",
            password: "1234",
        }
    
        const response = await requester.post("/api/sessions/login").send(user)
        expect(response.statusCode).to.be.equal(302)
        sessionCookie = response.headers["set-cookie"][0]
    })


    it("should create a cart", async () => {
        const response = await requester.post("/api/carts").set("Cookie", [sessionCookie])
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.cart).to.have.property("_id")
        expect(response._body.cart.products).to.be.deep.equal([])
        newcartId = response._body.cart._id
    })

    it("should get a cart products", async () => {
        const response = await requester.get(`/api/carts/${newcartId}`).set("Cookie", [sessionCookie])
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.products).to.be.deep.equal([])
    })

    it("should delete a cart", async () => {
        const response = await requester.delete(`/api/carts/${newcartId}`).set("Cookie", [sessionCookie])
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.status).to.be.equal("success")
    })
})