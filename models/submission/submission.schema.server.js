let mongoose = require('mongoose');

let submissionSchema = mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    answers: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        },
        trueFalseAnswer: Boolean,
        multipleChoiceAnswer: Number,
        fillBlanksAnswer: String,
        essayAnswer: String
    }],
    timestamp: Date
}, {collection: 'submission'});

module.exports = submissionSchema;