const econ = require('../../economy')
module.exports = {
    commands: ["balance", "bal"],
    argMax: 1,
    description: "Retrieves your or mentioned user balance",
    args: ["[User @ (mention)]"],
    permissions: [],
    callback: async (message) => {
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