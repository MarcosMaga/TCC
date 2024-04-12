const devicesModel = require('../models/devices');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = (req, res) => {
    let data = req.body;
    data.userId = req.session.user.id;
    devicesModel.insertDevices(data)
        .then((devices) => {
            res.status(200).send(devices);
        }).catch((error) => {
            if(error.code == 'P2002')
                res.status(409).send({error: 'Dispositivo já cadastrado'});
            else
                res.status(400).send({error: error.message});
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

const get = (req, res) => {
    devicesModel.getDevicesByUser(req.session.user.id)
        .then((devices) => {
            res.status(devices.length ? 200 : 204).send(devices)
        }).catch((error) => {
            res.status(400).send({error: error.message});
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

const del = (req, res) => {
    const data = req.params.id.split('_');

    devicesModel.deleteDevices(data[1], data[0])
        .then(() =>{
            res.status(200).send({msg: 'Dispositivo deletado com sucesso'});
        }).catch((error) => {
            error.code == 'P2025' ? res.status(404).send({error: 'Dispositivo não encontrado'}) : res.status(400).send({error: error.message});
        }).finally(async () => {
            await prisma.$disconnect();
        })
}

module.exports = {create, get, del};