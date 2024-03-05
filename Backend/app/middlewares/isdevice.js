const dotenv = require('dotenv');
dotenv.config();

const isDevice = (req, res, next) => {
    req.header('Secret') == process.env.SECRET ? next() : res.status(403).send({error: `Acesso negado.`});
}

module.exports = isDevice;