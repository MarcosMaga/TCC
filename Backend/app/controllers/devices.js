const devicesModel = require('../models/devices');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = (req, res) => {
    devicesModel.insertDevices(req.body)
        .then((devices) => {
            res.status(200).send(devices);
        }).catch((error) => {
            res.status(400).send({error: error.message});
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

const get = (req, res) => {
    devicesModel.getDevicesByUser(req.session.user.id)
        .then((devices) => {
            res.status(devices ? 200 : 203).send(devices)
        }).catch((error) => {
            res.status(400).send({error: error.message});
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

const del = (req, res) => {
    const data = req.params.id.split('-');

    devicesModel.deleteDevices(data[1], data[0])
        .then(() =>{
            res.status(200).send({msg: 'Dispositivo deletado com sucesso'});
        }).catch((error) => {
            res.status(400).send({error: error.message});
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

module.exports = {create, get, del};