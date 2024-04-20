const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const insertReading = async(data) => {
    return await prisma.reading.create({
        data,
    })
}

const getReadingsByDevice = async(id) => {
    return await prisma.reading.findMany({
        where: {
            deviceId: id
        }
    })
}

const getReadingsByMonth = async(id) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    return await prisma.readings.aggregate({
        _sum: {
            value: true,
        },
        where: {
            createdOn: {
                contains: `${currentMonth}`
            }
        }
    })
}
module.exports = {insertReading, getReadingsByDevice, getReadingsByMonth};