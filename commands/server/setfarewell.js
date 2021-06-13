const Commando = require('discord.js-commando')
const farewellModel = require('@models/FarewellData')

module.exports = class SetWelcome extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setfarewell',
            description: 'Set\'s the farewell message for the server',
            group: 'server',
            memberName: 'setfarewell',
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
                    prompt: 'Farewell message',
                    type: 'string'
                }
            ]
        })
    }

    async run(message, args) {
        const channel = message.guild.channels.cache.get(args.channel.replace(/</g, '').replace(/#/g, '').replace(/>/g, ''))
        const curMsg = await farewellModel.findOne({ _id: message.guild.id }).exec()
        if (!curMsg) {
            const newMsg = await farewellModel.create({
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
        message.reply(`Farewell message has been set`)
    }
}