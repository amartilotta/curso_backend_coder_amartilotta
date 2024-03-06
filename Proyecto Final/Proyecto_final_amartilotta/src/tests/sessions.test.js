import supertest from "supertest"
import { expect } from "chai"

const requester = supertest("http://localhost:8080")

describe("sessions router test", () => {
    let sessionCookie

    it("should register a user", async () => {
        const user = {
            first_name: "agustin",
            last_name: "martilotta",
            email: "usertest@gmail.com",
            age: 18,
            password: "1234"
        }

        const response = await requester.post("/api/sessions/signup").send(user)
        expect(response.statusCode).to.be.equal(302)
    })

    it("should login a user", async () => {
        const user = {
            email: "usertest@gmail.com",
            password: "1234",
        }

        const response = await requester.post("/api/sessions/login").send(user)
        expect(response.statusCode).to.be.equal(302)
        sessionCookie = response.headers["set-cookie"][0]
    })

    it("should get actual user", async () => {
        const response = await requester
        .get("/api/sessions/current").set("Cookie", [sessionCookie])
        expect(response.statusCode).to.be.equal(200)
        expect(response._body.user.email).to.be.equal("usertest@gmail.com")
    })
})