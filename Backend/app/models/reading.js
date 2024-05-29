const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const insertReading = async (data) => {
    return await prisma.reading.create({
        data,
    })
}

const getReadingsByDevice = async (id) => {
    return await prisma.reading.findMany({
        where: {
            deviceId: id
        },
        orderBy: {
            createdOn: 'asc'
        }
    })
}

const getReadingsByActuallyMonth = async (id) => {
    return await prisma.reading.aggregate({
        _sum: {
            value: true,
        },
        _count: {
            id: true,
        },
        where: {
            AND: [
                {
                    createdOn: {
                        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                    }
                },
                {
                    deviceId: id
                }
            ]
        }
    })
}

module.exports = { insertReading, getReadingsByDevice, getReadingsByActuallyMonth };