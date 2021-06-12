const welcomeModel = require('../../models/WelcomeData')

module.exports = {
    commands: ['setwelcome'],
    description: "Set\'s the welcome message for the server",
    permissions: ["ADMINISTRATOR"],
    args: ["<Channel Name (mention)>", "<Welcome message>"],
    minArg: 2,
    maxArg: 2,
    permissionError: "Only Admins can use this command",
    callback: async (message, arguments, text) => {
        const channel = message.guild.channels.cache.get(arguments[0].replace(/</g, '').replace(/#/g, '').replace(/>/g, ''))
        const curMsg = await welcomeModel.findOne({ _id: message.guild.id }).exec()
        arguments.shift()
        if (!curMsg) {
            const newMsg = await welcomeModel.create({
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
        message.reply(`Welcome message has been set`)
    }
}