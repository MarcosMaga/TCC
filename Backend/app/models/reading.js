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

module.exports = {insertReading, getReadingsByDevice};