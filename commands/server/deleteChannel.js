const Commando = require('discord.js-commando')

module.exports = class ClearChannel extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'delete-channel',
            aliases: ['delchannel'],
            group: 'server',
            memberName: 'deletechannel',
            description: 'Delete the current channel or the specified channel if name is given',
            clientPermissions: [
                'MANAGE_CHANNELS'
            ],
            userPermissions: [
                'MANAGE_CHANNELS'
            ]
        })
    }

    async run(message, args) {
        if (args) {
            const channel = message.guild.channels.cache.get(args.replace(/</, '').replace(/#/, '').replace(/>/, ''))
            if (!channel) return message.reply(`${args} channel Not Found`)
            channel.delete()
            message.reply(`${channel.name} Deleted Successfully`)
            message.delete()
        }
        else message.channel.delete()
    }
}