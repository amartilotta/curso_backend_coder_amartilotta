import { faker } from "@faker-js/faker"


export function generateProducts(quantity) {
    const products = []
  
    for (let i = 0; i < quantity; i++) {
      const product = {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.uuid(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int(),
        category: faker.commerce.department(),
        thumbnails: Array.from(
            { length: Math.floor(Math.random() * 6) }, 
            () => faker.system.fileName()
        ),
      }
  
      products.push(product)
    }
  
    return products
  }

export function generateUsers(quantity){

}