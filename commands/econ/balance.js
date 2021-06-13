const Commando = require('discord.js-commando')
const econ = require('@features/economy')

module.exports = class Balance extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "balance",
            aliases: ["bal"],
            group: 'economy',
            memberName: 'balance',
            description: "Retrieves your or mentioned user balance",
            argsType: 'multiple',
        })
    }

    async run(message) {
        const target = message.mentions.users.first() || message.author
        const targetID = target.id

        const guildId = message.guild.id
        const userId = target.id

        const coins = await econ.getWalletBalance(guildId,  userId)

        if (target === message.author) {
            message.reply(`You have ${coins} Empire Coins in your wallet`)
        } else {
            message.reply(`<@${targetID}> has ${coins} in their wallet`)
        }
    }
}