export class BasicMongo {
    constructor(model) {
        this.model = model
    }
    
    async createOne(data) {
        return this.model.create(data)
    }

    async updateOne(id, data) {
        return this.model.findByIdAndUpdate(id, data, {new:true})
    }
    
    async getAll(lean=true) {
        return lean ? this.model.find().lean() : this.model.find()
    }
    
    async deleteOne(id) {
        return this.model.findByIdAndDelete(id)
    }
    async getById(id, lean=true) {
        return lean ? this.model.findById(id).lean() : this.model.findById(id)
    }

}