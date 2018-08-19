var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

var app = express();

mongoose.connect('mongodb://heroku_kznkmz7s:h0i09tmeaq01ktek1d8763k3pl@ds123532.mlab.com:23532/heroku_kznkmz7s');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin',
        'https://cs4550-bk610-react-server.herokuapp.com/');
    res.header('Access-Control-Allow-Credentials',
        'true');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret'
}));

const userService = require('./services/user/user.service.server');
const sectionService = require('./services/section/section.service.server');
const enrollmentService = require('./services/enrollment/enrollment.service.server');

userService(app);
sectionService(app);
enrollmentService(app);

function setSession(req, res) {
    console.log(req.params);
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
    // console.log("Session??\n" + req.session);
    // console.log(res);
    res.send(req.session);
}

function resetSession(req, res) {
    req.session.destroy();
    res.sendStatus(200);
}

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);
app.get('/api/session/get',
    getSessionAll);
app.get('/api/session/reset',
    resetSession);

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname,'/dist/cs4550-bk610-angular-client/index.html'));
});
app.listen(process.env.PORT || 8080);