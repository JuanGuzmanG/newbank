const UserModel = require("./UserRepository");

class UserRepository {
    async save(user){
        return await UserModel.save(user);
    }
    async findById(_id){
        return await UserModel.findById(_id);
    }
    async findByEmail(email){
        throw new Error("Not Immplemented");
    }
    async findByDocument(documento){
        return await UserModel.findByDocument(documento);
    }
}
module.exports = UserRepository;