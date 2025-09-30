const UserRepository = require("../../port/UserRepository");
const UserModel = require("../../infrastructure/model/userModel");

class MongoUserRepository extends UserRepository{
    async save(user){
        const userCreated = new UserModel(user);
        return await userCreated.save();
    }
    async findByEmail(email){
        return await UserModel.findOne({email});
    }
    async findById(_id){
        return await  UserModel.findOne({ _id });
    }
    async findByDocument(documento) {
        return await  UserModel.findOne({documento});
    }
}
module.exports = MongoUserRepository;