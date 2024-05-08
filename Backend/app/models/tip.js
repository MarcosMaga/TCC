const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTipByDate = async (page, pageSize, userId) => {
    const tips = await prisma.tip.findMany({
        orderBy: {
            createdOn: 'desc'
        },
        include: {
            likes: true
        },
        skip: (page - 1) * pageSize,
        take: pageSize
    })

    const handleData = async () => {
        let newData = [];
        for (const tip of tips) {
            const isLiked = await prisma.like.findUnique({
                where: {
                    tipId_userId: {
                        tipId: tip.id,
                        userId: userId
                    }
                }
            });
            tip.isLiked = isLiked ? true : false;
            newData.push(tip);
        }
        return newData;
    }

    return await handleData();
}

const getTipByLiked = async (page, pageSize, userId) => {
    const tips = await prisma.tip.findMany({
        orderBy: {
            likes: {
                _count: 'desc'
            }
        },
        include: {
            likes: true
        },
        skip: (page - 1) * pageSize,
        take: pageSize
    })


    const handleData = async () => {
        let newData = [];
        for (const tip of tips) {
            const isLiked = await prisma.like.findUnique({
                where: {
                    tipId_userId: {
                        tipId: tip.id,
                        userId: userId
                    }
                }
            });
            tip.isLiked = isLiked ? true : false;
            newData.push(tip);
        }
        return newData;
    }

    return await handleData();
}

module.exports = { getTipByDate, getTipByLiked }