module.exports = function (app) {
    var submissionModel = require('../../models/submission/submission.model.server');

    function submitQuiz(req, res) {
        return submissionModel.createSubmission(req.body)
            .then(response => res.send(response));
    }

    function findSubmissionsForQuiz(req, res) {
        var studentId = req.session['currentUser']._id;
        var quizId = req.params['quizId'];
        return submissionModel.findAllSubmissionsByStudentForQuiz(studentId, quizId)
            .then(response => res.send(response));
    }

    function findSubmissionById(req, res) {
        var submissionId = req.params['submissionId'];
        return submissionModel.findSubmissionById(submissionId)
            .then(response => res.send(response));
    }

    app.post('/api/quiz/:quizId/submission', submitQuiz);
    app.get('/api/quiz/:quizId/submission', findSubmissionsForQuiz);
    app.get('/api/quiz/:quizId/submission/:submissionId', findSubmissionById);
};