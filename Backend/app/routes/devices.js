const devicesController = require('../controllers/devices');
const userLogged = require('../middlewares/logged');

module.exports = {
    devices: (app) => {
        app.post('/devices', userLogged, (req, res) => {
            devicesController.create(req, res);
        })
        app.get('/devices', userLogged, (req, res) => {
            devicesController.get(req, res);
        })
        app.delete('/devices/:id', userLogged, (req, res) => {
            devicesController.del(req, res);
        })
    }
}