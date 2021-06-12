const farewellModel = require('../../models/FarewellData')

module.exports = {
    commands: ['setfarewell'],
    description: "Set\'s the farewell message for the server",
    permissions: ["ADMINISTRATOR"],
    args: ["<Channel Name (mention)>", "<Farewell message>"],
    argMin: 2,
    argMax: 2,
    permissionError: "Only Admins can use this command",
    callback: async (message, arguments, text) => {
        const channel = message.guild.channels.cache.get(arguments[0].replace(/</g, '').replace(/#/g, '').replace(/>/g, ''))
        const curMsg = await farewellModel.findOne({ _id: message.guild.id }).exec()
        arguments.shift()
        if (!curMsg) {
            const newMsg = await farewellModel.create({
                _id: message.guild.id,
                channelId: channel.id,
                text: arguments.join(' ')
            })
            newMsg.save()
        } else {
            curMsg.channelId = channel.id
            curMsg.text = arguments.join(' ')
            curMsg.save()
        }
        message.reply(`Farewell message has been set`)
    }
}