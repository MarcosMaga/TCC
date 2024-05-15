const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const insertNotificationState = async(data) => {
    return await prisma.notificationState.create({
        data,
    })
}

const getNotificationStateByUser = async(userId, type) => {
    return await prisma.notificationState.findFirst({
        where: {
            userId,
            type
        },
        orderBy: {
            createdOn: 'desc'
        }
    })
}

module.exports = {insertNotificationState, getNotificationStateByUser};