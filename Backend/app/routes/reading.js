const readingController = require('../controllers/reading');
const isDevice = require('../middlewares/isdevice');
const userLogged = require('../middlewares/logged');
const { validationResult } = require('express-validator');
const {readingValidator} = require('../validators/reading');

module.exports = {
    reading: (app) => {
        app.post('/reading', isDevice, readingValidator, (req, res) => {
            readingController.create(req, res, validationResult(req));
        })
        app.get('/reading/device/:id', userLogged, (req, res) => {
            readingController.get(req, res);
        })
        app.get('/reading/month/:id', userLogged, (req, res) => {
            readingController.byMonth(req, res);
        })
    }
}