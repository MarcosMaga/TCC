const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const insertToken = async(data) => {
    return await prisma.token.create({
        data,
    })
}

const getTokensByUser = async(userId) => {
    return await prisma.token.findMany({
        where: {
            userId
        }
    })
}

module.exports = {insertToken, getTokensByUser};