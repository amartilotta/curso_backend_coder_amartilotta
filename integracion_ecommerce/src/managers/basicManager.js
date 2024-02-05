export default class BasicManager{
    constructor(model, populateOption){
        this.model = model;
        this.populateOption = populateOption;
    }
    
    async createOne(obj){
        return this.model.createOne(obj);
    }
    async findAll(){
        return this.model.find().populate(this.populateOption);
    }

    async findById(id){
        return this.model.findById(id).populate(this.populateOption);
    }

    async updateOne(obj){
        return this.model.updateOne({ id:id }, obj)
    }

    async deleteOne(id) {
        return this.model.deleteOne({ _id: id });
      }
}