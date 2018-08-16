let mongoose = require('mongoose');
let userSchema = require('./user.schema.server');
let userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    let response = userModel.findOne(credentials);
    return response;
}

function findUserByUsername(username) {
    let response = userModel.findOne({username: username});
    return response;
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(user, userId) {
    return userModel.update({_id: userId}, {$set: user});
}

let api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    updateUser: updateUser,
    deleteUser: deleteUser
};

module.exports = api;