const readingModel = require('../models/reading');
const devicesModel = require('../models/devices');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');
const { reading } = require('../routes/reading');
dotenv.config();

const create = (req, res, validation) => {
    if (!validation.isEmpty()) {
        res.status(400).send({ error: validation.array() });
    } else {
        readingModel.insertReading(req.body)
            .then((readings) => {
                res.status(200).send(readings);
            }).catch((error) => {
                res.status(400).send({ error: error.message });
                console.log(error);
            }).finally(async () => {
                await prisma.$disconnect();
            })
    }
}

const get = (req, res) => {
    readingModel.getReadingsByDevice(req.params.id)
        .then((readings) => {
            res.status(readings.length ? 200 : 204).send(readings);
        }).catch((error) => {
            res.status(400).send({ error: error.message });
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

const getRealTimeConsumption = (socket) => {
    let quant = 0;

    const getData = () => {
        if (socket.handshake.query.id) {
            if (socket.handshake.auth.token) {
                jwt.verify(socket.handshake.auth.token, process.env.SECRET, (err, decoded) => {
                    if (!err) {
                        devicesModel.getDevicesByUser(decoded.id)
                            .then((devices) => {
                                if (devices.find(device => device.deviceId === socket.handshake.query.id)) {
                                    readingModel.getReadingsByActuallyMonth(socket.handshake.query.id)
                                        .then((value) => {
                                            if (quant != value._count.id) {
                                                quant = value._count.id;
                                                socket.emit('consumption', value._sum.value ? value._sum.value / 1000 : 0);
                                            }
                                        }).catch((error) => {
                                            console.log(error);
                                        }).finally(async () => {
                                            await prisma.$disconnect();
                                        })
                                }
                            }).catch((error) => {
                                console.error(error);
                            }).finally(async () => {
                                await prisma.$disconnect();
                            })
                    }
                })
            }
        }
    }

    if (socket.user) {
        getData();
        setInterval(() => {
            getData();
        }, 3000);
    }
}

const byMonth = (req, res) => {
    if(req.params.id){
        devicesModel.getDevicesByUser(req.user.id)
        .then((devices) => {
            if(devices.find(device => device.deviceId === req.params.id)) {
                readingModel.getReadingsByDevice(req.params.id)
                    .then((readings) => {
                        let readingsByMonth = {};

                        readings.forEach(reading => {
                            const date = new Date(reading.createdOn);

                            if(`${date.getMonth()+1}/${date.getFullYear().toString().slice(-2)}` in readingsByMonth)
                                readingsByMonth[`${date.getMonth()+1}/${date.getFullYear().toString().slice(-2)}`] += reading.value / 1000;
                            else
                                readingsByMonth[`${date.getMonth()+1}/${date.getFullYear().toString().slice(-2)}`] = reading.value / 1000;
                        })
                        res.status(200).send(readingsByMonth);
                    }).catch((error) => {
                        console.error(error);
                    }).finally(async () => {
                        await prisma.$disconnect();
                    })
            }else{
                res.status(403).send({msg: 'Acesso negado'});
            }
        }).catch((error) => {
            console.error(error);
        }).finally(async () => {
            await prisma.$disconnect();
        })
    }else{
        res.status(400).send({error: 'ID do dispositivo não fornecido'});
    }
}

module.exports = { create, get, getRealTimeConsumption, byMonth };