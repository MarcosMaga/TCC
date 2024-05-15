const tokenModel = require('../models/token');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = (req, res) => {
    const data = {
        userId: req.user.id,
        token: req.body.token
    }

    tokenModel.insertToken(data)
        .then((token) => {
            res.status(200).send(token);
        }).catch((error) => {
            if(error.code == 'P2002')
                res.status(200).end();
            else
                res.status(400).send({error: error.message})
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

module.exports = {create};