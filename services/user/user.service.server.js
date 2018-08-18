module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    // app.get('/api/login/active', checkIfLoggedIn);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user/current', findCurrentUser);
    app.post('/api/user/register', register);
    app.get('/api/user/profile', profile);
    app.post('/api/user/login', login);
    app.post('/api/user/logout', logout);
    app.put('/api/user/profile', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    var userModel = require('../../models/user/user.model.server');

    function register(req, res) {
        var user = req.body;
        var success;
        userModel.findUserByUsername(user.username)
            .then(function (response) {
                success = response === null;
            })
            .then(function () {
                if (success) {
                    userModel.createUser(user)
                        .then(function (user) {
                            console.log(user);
                            req.session['currentUser'] = user;
                            console.log(req.session);
                            res.sendStatus(200);
                        })
                } else {
                    res.sendStatus(404);
                }
            })
    }

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                if (user !== null) {
                    req.session['currentUser'] = user;
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }

    function profile(req, res) {
        var userId = req.session['currentUser']._id;
        userModel.findUserById(userId)
            .then(function (response) {
                res.send(response);
            })
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.session['currentUser']._id;
        userModel.updateUser(user, userId)
            .then(function (response) {
                if (response.ok === 1) {
                    res.json(user);
                } else {
                    res.json(404);
                }
            })
    }

    function deleteUser(req, res) {
        var userId = req.session['currentUser']._id;
        userModel.deleteUser(userId)
            .then(function (response) {
                res.send(response);
            })
    }

    function findUserById(req, res) {
        // console.log("Finding by id:\n" + req.params);
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    // function checkIfLoggedIn(req, res) {
    //     var user = req.session['currentUser'];
    //     if (user === undefined) {
    //         res.sendStatus(404);
    //     } else {
    //         res.sendStatus(200);
    //     }
    // }

    function findCurrentUser(req, res) {
        // console.log('finding current user');
        // console.log('session: ' + req.session);
        if (req.session['currentUser'] === undefined) {
            res.send(403);
        } else {
            const currentUser = req.session['currentUser'];
            // console.log("What" + currentUser);
            if (currentUser) {
                userModel.findUserById(currentUser._id)
                    .then(user => {
                        res.send(user);
                    });
            } else {
                res.sendStatus(403);
            }
        }

    }
};