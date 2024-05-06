const settingModel = require('../models/setting');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const configure = (req, res) => {
    let { setting } = req.body;
    setting.userId = req.user.id;

    settingModel.insertSetting(setting)
        .then((set) => {
            delete set.user.password;
            const token = jwt.sign(set.user, process.env.SECRET, { expiresIn: '1h' });
            if (token)
                res.status(200).send({ token });
            else
                res.status(500).send({ error: 'Erro ao atualizar usuário' });
        }).catch((error) => {
            if (error.code == 'P2002') {
                settingModel.updateSetting(req.user.id, setting)
                    .then((set) => {
                        delete set.user.password;
                        const token = jwt.sign(set.user, process.env.SECRET, { expiresIn: '1h' });
                        if (token)
                            res.status(200).send({ token });
                        else
                            res.status(500).send({ error: 'Erro ao atualizar usuário' });
                    }).catch((error) => {
                        console.log(error);
                        res.status(400).send({ error });
                    }).finally(async () => {
                        await prisma.$disconnect();
                    })
            } else {
                res.status(400).send({ error });
            }
        }).finally(async () => {
            await prisma.$disconnect();
        })

}

module.exports = { configure }