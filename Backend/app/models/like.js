const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const insertLike = async(data) => {
    return await prisma.like.create({
        data,
    })
}

const deleteLike = async(tipId, userId) => {
    return await prisma.like.delete({
        where:{
            tipId_userId: {
                tipId: tipId,
                userId: userId
            }
        }
    })
}

module.exports = {insertLike, deleteLike}
