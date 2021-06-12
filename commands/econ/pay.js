const econ = require('../../economy')

module.exports = {
    commands: ["pay"],
    argMin: 2, 
    argMax: 2,
    args: ["<User @ (mention)>", "<Coins to pay>"],
    permissions: [],
    callback: async (message, arguments, text) => {
        const { guild, member } = message

        const target = message.mentions.users.first()
        if (!target) return message.reply("Please tag a user to send coins")
        const coins = Number(arguments[1])

        if (isNaN(coins)) return message.reply("Please provide a valid number of coins")
        const myCoins = await econ.getWalletBalance(guild.id, member.id)

        if (coins > myCoins) return message.reply("Insufficient Funds in your wallet")
        const remCoins = await econ.addCoins(guild.id, member.id, coins*-1)
        const newBal = await econ.addCoins(guild.id, target.id, coins)

        message.reply(`Give ${coins} E Coins to <@${target.id}>, your current balance is ${remCoins} in your wallet`)
    }
}