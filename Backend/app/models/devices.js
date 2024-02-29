const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const insertDevices = async(data) => {
    return await prisma.devices.create({
        data,
    })
}

const deleteDevices = async(deviceId, userId) => {
    return await prisma.devices.delete({
        where:{
            userId_deviceId: {
                userId: userId,
                deviceId: deviceId
            }
        }
    })
}

const getDevicesByUser = async(id) => {
    return await prisma.post.findMany({
        where: {
            userId: id
        }
    })
}

module.exports = {insertDevices, deleteDevices, getDevicesByUser}