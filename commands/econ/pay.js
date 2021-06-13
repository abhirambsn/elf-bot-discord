const Commando = require('discord.js-commando')
const econ = require('@features/economy')

module.exports = class Pay extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'pay',
            group: 'economy',
            memberName: 'pay',
            argsCount: 2,
            // argsType: 'multiple',
            description: "Pay Money to a User",
            args: [
                {
                    key: 'user',
                    prompt: '<User @ (mention)>',
                    type: 'string'
                },
                {
                    key: 'coins',
                    prompt: '<Coins to pay>',
                    type: 'string'
                }
            ],
        })
    }

    async run(message, args) {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target) return message.reply("Please tag a user to send coins")
        const coins = Number(args['coins'])

        if (isNaN(coins)) return message.reply("Please provide a valid number of coins")
        const myCoins = await econ.getWalletBalance(guild.id, member.id)

        if (coins > myCoins) return message.reply("Insufficient Funds in your wallet")
        const remCoins = await econ.addCoins(guild.id, member.id, coins*-1)
        const newBal = await econ.addCoins(guild.id, target.id, coins)

        message.reply(`Give ${coins} E Coins to <@${target.id}>, your current balance is ${remCoins} in your wallet`)
    }
}