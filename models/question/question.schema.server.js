let mongoose = require('mongoose');

let questionSchema = mongoose.Schema({
    title: String,
    points: Number,
    description: String,
    questionType: String,
    blanks: [{
        type: String
    }],
    true: Boolean,
    choice: {
        text: String,
        value: String,
        correct: Boolean
    }
}, {collection: 'question'});

module.exports = questionSchema;