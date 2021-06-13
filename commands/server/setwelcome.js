const Commando = require('discord.js-commando')
const welcomeModel = require('@models/WelcomeData')

module.exports = class SetWelcome extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setwelcome',
            description: 'Set\'s the welcome message for the server',
            group: 'server',
            memberName: 'setwelcome',
            argsCount: 2,
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            userPermissions: [
                'ADMINISTRATOR'
            ],
            args: [
                {
                    key: 'channel',
                    prompt: 'Channel Name (mention)',
                    type: 'string'
                },
                {
                    key: 'message',
                    prompt: 'Welcome message',
                    type: 'string'
                }
            ]
        })
    }

    async run(message, args) {
        const channel = message.guild.channels.cache.get(args.channel.replace(/</g, '').replace(/#/g, '').replace(/>/g, ''))
        const curMsg = await welcomeModel.findOne({ _id: message.guild.id }).exec()
        if (!curMsg) {
            const newMsg = await welcomeModel.create({
                _id: message.guild.id,
                channelId: channel.id,
                text: args.message
            })
            newMsg.save()
        } else {
            curMsg.channelId = channel.id
            curMsg.text = args.message
            curMsg.save()
        }
        message.reply(`Welcome message has been set`)
    }
}