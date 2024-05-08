const userLogged = require('../middlewares/logged');
const likeController = require('../controllers/like');

module.exports = { 
    like: (app) => {
        app.post('/like', userLogged, (req, res) => {
            likeController.action(req, res);
        })
    }
}