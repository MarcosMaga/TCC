const userLogged = (req, res, next) => {
    req.session.user ? next() : res.status(403).send({error: `Usuário não logado`})
}

module.exports = userLogged;