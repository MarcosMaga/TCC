const readingModel = require('../models/reading');
const devicesModel = require('../models/devices');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');
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
                                    readingModel.getReadingsByMonth(socket.handshake.query.id)
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

module.exports = { create, get, getRealTimeConsumption };