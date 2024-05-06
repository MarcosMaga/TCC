const userLogged = require("../middlewares/logged");
const settingController = require('../controllers/setting');

module.exports = {
    setting: (app) => {
        app.post('/setting', userLogged, (req, res) => {
            settingController.configure(req, res);
        })
    }
}