class UsersManager{
    constructor(){
        this.toys = [];
    }

    findAll(){
        return this.toys;
    }

    findById(id){
        const toy = this.toys.find((t) => t.id === id);
        return toy;
    }

    createdOne(obj){
        const id = this.toys.length ? this.toys[this.toys.length -1].id + 1: 1;
        const newObj = { id, ... obj};
        this.toys.push(newObj);
        return newObj;
    }
}

export const usersManager = new UsersManager();
