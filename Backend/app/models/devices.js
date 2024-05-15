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
    return await prisma.devices.findMany({
        where: {
            userId: id
        }
    })
}

const getDeviceByDevice = async(id) => {
    return await prisma.devices.findFirst({
        where: {
            deviceId: id
        },
        include: {
            user: {
                include: {
                    setting: true
                }
            }
        }
    })
}

module.exports = {insertDevices, deleteDevices, getDevicesByUser, getDeviceByDevice};