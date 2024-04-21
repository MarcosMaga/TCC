const readingsController = require('../controllers/reading');

module.exports = {
    socket: (app) => {
        app.io.on('connection', (socket) => {
            readingsController.getRealTimeConsumption(socket);
            console.log('conectou');
        })
    }
}