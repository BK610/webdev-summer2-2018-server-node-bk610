let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    type: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    role: String,
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'SectionModel'
    }]
}, {collection: 'user'});

module.exports = userSchema;