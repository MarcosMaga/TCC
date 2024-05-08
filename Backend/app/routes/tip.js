const tipController = require('../controllers/tip');
const userLogged = require('../middlewares/logged');

module.exports = {
    tip: (app) => {
        app.get('/tip', userLogged, (req, res) => {
            tipController.get(req, res);
        })
    }
}