var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();
const path = require('path');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://.herokuapp.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

mongoose.connect('mongodb://eh:cs4550@ds123129.mlab.com:23129/eh-cs4550');

const userService = require('./services/user.service.server');
userService(app);

const sectionService = require('./services/section.service.server');
sectionService(app);

const quizService = require('./services/quiz.service.server');
quizService(app);

const questionService = require('./services/question.service.server');
questionService(app);

const submissionService = require('./services/submission.service.server');
submissionService(app);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

function getSessionAll(req, res) {
    res.send(req.session);
}

function resetSession(req, res) {
    req.session.destroy();
    res.sendStatus(200);
}

/*REQUESTS*/
app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);
app.get('/api/session/get',
    getSessionAll);
app.get('/api/session/reset',
    resetSession);

app.get('/*', function(req,res) {

    res.sendFile(path.join(__dirname,'/dist//*cs4550-ehao-angular-client*//index.html'));
});
app.listen(process.env.PORT || 3000);