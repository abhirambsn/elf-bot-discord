const profileModel = require('./models/profile')

let coinCache = {}
let bankCache = {}

module.exports = (client) => {}

module.exports.getWalletBalance = async (guildId, userId) => {
    const cachedValue = coinCache[`${guildId}-${userId}`]
    if (cachedValue) return cachedValue

    const result = await profileModel.findOne({ guildId: guildId, userId: userId }).exec()
    if (!result) {
        const newProfile = await profileModel.create({
            guildId: guildId,
            userId: userId
        })

        newProfile.save()
        coinCache[`${guildId}-${userId}`] = newProfile.coins
        return newProfile.coins
    } else {
        coinCache[`${guildId}-${userId}`] = result.coins
        return result.coins
    }
}

module.exports.getBankBalance = async (guildId, userId) => {
    const cachedValue = bankCache[`${guildId}-${userId}`]
    if (cachedValue) return cachedValue

    const result = await profileModel.findOne({ guildId: guildId, userId: userId }).exec()
    if (!result) {
        const newProfile = await profileModel.create({
            guildId: guildId,
            userId: userId
        })

        newProfile.save()
        bankCache[`${guildId}-${userId}`] = newProfile.bank
        return newProfile.bank
    } else {
        bankCache[`${guildId}-${userId}`] = result.bank
        return result.bank
    }
}

module.exports.addCoins = async (guildId, userId, coins) => {
    const result = await profileModel.findOne({ guildId: guildId, userId: userId }).exec()
    if (!result) {
        const newProfile = await profileModel.create({
            guildId: guildId,
            userId: userId
        })

        newProfile.save()
        return newProfile.coins
    } else {
        result.coins += coins
        result.save()
        return result.coins
    }
}

module.exports.deposit = async (guildId, userId, amount) => {

}

module.exports.withdraw = async (guildId, userId, amount) => {

}