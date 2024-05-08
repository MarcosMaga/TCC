const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const tipModel = require('../models/tip');

const get = (req, res) => {
    const page = req.query.page || 1;
    const pageSize = 5;
    const type = req.query.type || "new";

    if(type == "new"){
        tipModel.getTipByDate(page, pageSize, req.user.id)
            .then((tips) => {
                res.status(200).send(tips);
            }).catch((error) => {
                res.status(400).send(error);
                console.log(error);
            }).finally(async () => {
                await prisma.$disconnect();
            })
    }else if(type == "liked"){
        tipModel.getTipByLiked(page, pageSize, req.user.id)
            .then((tips) => {
                res.status(200).send(tips);
            }).catch((error) => {
                res.status(400).send(error);
                console.log(error);
            }).finally(async () => {
                await prisma.$disconnect();
            })
    }
}

module.exports = {get}