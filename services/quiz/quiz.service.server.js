module.exports = function (app) {
    var quizModel = require('../../models/quiz/quiz.model.server');

    function findAllQuizzes(req, res) {
        quizModel.findAllQuizzes()
            .then(quizzes => res.send(quizzes));
    }

    function findQuizById(req, res) {
        var quizId = req.params['quizId'];
        quizModel.findQuizById(quizId)
            .then(function (response) {
                res.send(response);
            })
    }

    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
};