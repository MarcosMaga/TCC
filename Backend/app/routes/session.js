const sessionController = require('../controllers/session');
const { validationResult } = require('express-validator');
const { userValidator } = require('../validators/user');

module.exports = {
    login: (app) => {
        app.post('/login', (req, res) => {
            sessionController.signin(req, res);
        })
    },
    signup: (app) => {
        app.post('/signup', userValidator, (req, res) => {
            sessionController.signup(req, res, validationResult(req));
        })
    },
    logout: (app) => {
        app.get('/logout', (req, res) => {
            sessionController.logout(req, res);
        })
    }
}