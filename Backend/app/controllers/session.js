const usersModel = require('../models/user');
const logger = require('../../config/logger');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signin = (req, res) => {
    usersModel.getUserByEmail(req.body.email)
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.status(400).send({ error: err.message });
                        logger.error(`Erro ao comparar senha de @${user.username}`);
                    }
                    if (result) {
                        user.ip = req.ip;
                        usersModel.updateUser(user.id, user);
                        delete user.password;
                        req.session.user = user;
                        res.status(200).send(user);
                    } else {
                        res.status(404).send({ error: "Senha ou email incorreto" });
                    }
                })
            } else
                res.status(404).send({ error: "Senha ou email incorreto" });
        }).catch((error) => {
            res.status(400).send({ error: error.message });
            logger.error(`Erro ao achar usuário com email: ${req.body.email}.`);
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

const signup = (req, res, error) => {
    let data = req.body;
    delete data.passwordC;
    if (!error.isEmpty()) {
        res.status(400).send({ error: error.array()});
    }
    else {
        data.ip = req.ip;
        bcrypt.hash(data.password, 10, (err, hash) => {
            if (err) {
                res.status(400).send({error: err.message});
                logger.error(`Erro ao transformar senha de ${req.email} em HASH. Código: ${err.code}`);
            }
            data.password = hash;

            usersModel.insertUser(data)
                .then((user) => {
                    res.status(200).send(user);
                }).catch((error) => {
                    if (error.code === "P2002") {
                        res.status(400).send({ error: `O email ${data.email} já esta em uso`});
                    } else {
                        logger.error(`Erro ao criar usuário ${data.email}. Código: ${error.code}`);
                        res.status(400).send({error: error.message});
                    }
                }).finally(async () => {
                    await prisma.$disconnect();
                })
        });
    }
}

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err)
            logger.error(`Erro ao deslogar usuário @${req.session.user.username}`);
        res.status(200).end();
    })
}

module.exports = { signin, signup, logout };