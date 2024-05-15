const tokenController = require('../controllers/token');
const userLogged = require('../middlewares/logged');

module.exports = {
    token: (app) => {
        app.post('/token', userLogged, (req, res) => {
            tokenController.create(req, res);
        })
    }
}