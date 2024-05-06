const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const insertSetting = async(data) => {
    return await prisma.setting.create({
        data,
        include: {
            user: {
                include: {
                    setting: true
                }
            },
        }
    })
}

const updateSetting = async(userId, data) => {
    return await prisma.setting.update({
        where: { userId },
        data: data,
        include: {
            user: {
                include: {
                    setting: true
                }
            },
        }
    })
}

module.exports = {insertSetting, updateSetting};