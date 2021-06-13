const Commando = require('discord.js-commando')
const dailyRewards = require('@models/dailyRewards')
const profileModel = require("@models/profile")

let claimCache = []

const clearCache = () => {
    claimCache = []
    setTimeout(clearCache, 1000*60*10)
}

clearCache()

module.exports = class DailyReward extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'earn',
            group: 'economy',
            memberName: 'earn',
            description: "Earn Daily Currency"
        })
    }

    async run(message) {
        const { guild, member } = message
        const { id } = member

        if (claimCache.includes(id)) {
            return message.reply("Daily Earning Already Claimed")
        }

        const dailyReward = await dailyRewards.findOne({ guildId: guild.id, userId: id }).exec()

        if (dailyReward) {
            const then = new Date(dailyReward.updatedAt).getTime()
            const now = new Date().getTime()

            const diff = Math.abs(now - then)
            const days = Math.round(diff / (1000*60*60*24))
            if (days <= 1) {
                claimCache.push(id)
                return message.reply("Daily Earning Already Claimed")
            }
        }

        await dailyRewards.findOneAndUpdate({ guildId: guild.id, userId: id }, { guildId: guild.id, userId: id }, {
            upsert: true
        }).exec() 
        claimCache.push(id)

        const profile = await profileModel.findOne({ guildId: guild.id, userId: id }).exec()
        if (profile) {
            profile.coins += 1000
            profile.save()
        }

        message.reply("Daily Earning Claimed")

    }
}