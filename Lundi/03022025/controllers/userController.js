const {
    getAllUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService
} = require("../services/userServices");


exports.getAllUsers = (req, res, next) => {
    try {
        const users = getAllUsersService(req, res, next);
        if (!users) throw new Error("Users not found");
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        next(error);
    }
}

exports.getUserById = (req, res, next) => {
    try {
        const users = getUserByIdService(req, res, next);
        if (!users) throw new Error("User not found");
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        next(error);
    }
}

exports.createUser = (req, res, next) => {
    res.status(200).json({ success: true })
}

exports.updateUser = (req, res, next) => {
    res.status(200).json({ success: true })
}

exports.deleteUser = (req, res, next) => {
    try {
        const result = deleteUserService(req, res, next);
        if (!result) throw new Error("User not deleted");
        res.status(200).json({ success: result })
    } catch (error) {
        next(error);
    }
}