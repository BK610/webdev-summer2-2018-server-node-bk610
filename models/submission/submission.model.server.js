let mongoose = require('mongoose');
let submissionSchema = require('./submission.schema.server');
let submissionModel = mongoose.model('SubmissionModel', submissionSchema);

function findAllSubmissionsByStudentForQuiz(studentId, quizId) {
    submissionModel.find({
        student: studentId,
        quiz: quizId
    });
}

function findSubmissionById(submissionId) {
    submissionModel.findById(submissionId);
}

function createSubmission(submission) {
    submissionModel.create(submission);
}

function addQuestion(quizId, questionId) {
    quizModel.update({
        _id: quizId
    }, {
        $push: {
            questions: questionId
        }
    });
}

function updateQuiz(quizId, newQuiz) {
    quizModel.update({
        _id: quizId
    }, {
        $set: newQuiz
    });
}

function deleteQuiz(quizId) {
    quizModel.remove({
        _id: quizId
    });
}

let api = {
    findAllSubmissionsByStudentForQuiz: findAllSubmissionsByStudentForQuiz,
    createSubmission: createSubmission,
    findSubmissionById: findSubmissionById
}

module.exports = api;