const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const likeModel = require('../models/like');

const action = (req, res) => {
    const data = {
        tipId: req.body.tipId,
        userId: req.user.id
    }

    likeModel.insertLike(data)
        .then(() => {
            res.status(200).send({msg: 'Sucesso'});
        }).catch((error) => {
            if(error.code == 'P2002'){
                likeModel.deleteLike(data.tipId, data.userId)
                    .then(() => {
                        res.status(200).send({msg: 'Sucesso'});
                    }).catch((error) => {
                        res.status(400).send(error);
                    }).finally(async () => {
                        await prisma.$disconnect();
                    })
            }else{
                res.status(400).send(error);
            }
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

module.exports = {action};