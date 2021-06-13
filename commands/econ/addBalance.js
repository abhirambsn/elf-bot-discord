const Commando = require('discord.js-commando')
const econ = require('@features/economy')

module.exports = class AddBalance extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'addbalance',
            aliases: ["addbal"],
            group: 'economy',
            memberName: 'addbalance',
            argsType: 'multiple',
            description: "Add Balance to a user account",
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            userPermissions: [
                'ADMINISTRATOR'
            ]
        })
    }
    
    async run(message, args) {
        const mention = message.mentions.users.first()
        if (!mention) return message.reply("Please mention a user to add coins")

        const coins = Number(args[1])
        if (isNaN(coins)) return message.reply("Please provide a valid Number")

        const guildId = message.guild.id
        const userId = mention.id

        const addedCoins = await econ.addCoins(guildId, userId, coins)

        message.reply(`${coins} E Coins were added to <@${userId}>\'s wallet`)
    }
}