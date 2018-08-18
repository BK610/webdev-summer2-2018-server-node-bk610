let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    role: String,
    sections: [String]
}, {collection: 'user'});

module.exports = userSchema;