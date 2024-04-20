const readingModel = require('../models/reading');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = (req, res, validation) => {
    if(!validation.isEmpty()){
        res.status(400).send({error: validation.array()});
    }else{
        readingModel.insertReading(req.body)
            .then((readings) => {
                res.status(200).send(readings);
            }).catch((error) => {
                res.status(400).send({error: error.message});
                console.log(error);
            }).finally(async () => {
                await prisma.$disconnect();
            })
    }
}

const get = (req, res) => {
    readingModel.getReadingsByDevice(req.params.id)
        .then((readings) => {
            res.status(readings.length ? 200: 204).send(readings);
        }).catch((error) => {
            res.status(400).send({error: error.message});
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

const getRealTimeConsumption = (socket) => {
    const getData = () => {
        socket.emit('consumption', socket.handshake.query.id);
    }

    if(socket.user){
        getData();
        setInterval(() => {
            getData();
        }, 2000);
    }
}

module.exports = {create, get, getRealTimeConsumption};