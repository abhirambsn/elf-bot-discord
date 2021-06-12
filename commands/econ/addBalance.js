const econ = require('../../economy')

module.exports = {
    commands: ["addbalance", "addbal"],
    argMin: 2,
    argMax: 2,
    description: "Adds Balance to the mentioned user",
    args: ["<@Target User (mention)>", "<coins>"],
    permissions: ["ADMINISTRATOR"],
    permissionError: "Only Administrator can use this command",
    callback: async (message, arguments) => {
        const mention = message.mentions.users.first()
        if (!mention) return message.reply("Please mention a user to add coins")
        
        const coins = Number(arguments[1])
        if (isNaN(coins)) return message.reply("Please provide a valid Number")

        const guildId = message.guild.id
        const userId = mention.id

        const addedCoins = await econ.addCoins(guildId, userId, coins)

        message.reply(`${addedCoins} E Coins were added to <@${userId}>\'s wallet`)
    }
}