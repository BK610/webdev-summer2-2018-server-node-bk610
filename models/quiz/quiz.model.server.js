const mongoose = require('mongoose');
const quizSchema = require('./quiz.schema.server');
const quizModel = mongoose.model('QuizModel', quizSchema);

function findAllQuizzes() {
    return quizModel.find();
}

function findQuizById(quizId) {
    return quizModel.findById(quizId)
        .populate('questions')
        .exec();
}

function createQuiz(quiz) {
    return quizModel.create(quiz);
}

function addQuestion(quizId, questionId) {
    return quizModel.update({
        _id: quizId
    }, {
        $push: {
            questions: questionId
        }
    });
}

function updateQuiz(quizId, newQuiz) {
    return quizModel.update({
        _id: quizId
    }, {
        $set: newQuiz
    });
}

function deleteQuiz(quizId) {
    return quizModel.remove({
        _id: quizId
    });
}

let api = {
    findAllQuizzes: findAllQuizzes,
    findQuizById: findQuizById,
    createQuiz: createQuiz,
    deleteQuiz: deleteQuiz,
    updateQuiz: updateQuiz,
    addQuestion: addQuestion
};

module.exports = api;