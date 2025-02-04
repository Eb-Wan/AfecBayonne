const Users = require("../repositories/userRepository");
const users = new Users();

exports.getAllUsersService = (req, res, next) => {
    try {
        return users.find();
    } catch (error) {
        next(error);
    }
}

exports.getUserByIdService = (req, res, next) => {
    try {
        const { id } = req.params;
        return users.find(id);
    } catch (error) {
        next(error);
    }
}

exports.createUserService = (req, res, next) => {
    try {
        getUserByIdService(req.body);
    } catch (error) {
        next(error);
    }
}

exports.updateUserService = (req, res, next) => {
    try {
        const { id } = req.params;
        updateUserService(id);
    } catch (error) {
        next(error);
    }
}

exports.deleteUserService = (req, res, next) => {
    try {
        const { id } = req.params;
        const result = users.delete(id);
        return result;
    } catch (error) {
        next(error);
    }
}