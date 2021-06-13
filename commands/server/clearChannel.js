const Commando = require('discord.js-commando')

module.exports = class ClearChannel extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clearchannel',
            aliases: ['cc'],
            group: 'server',
            memberName: 'clearchannel',
            description: 'Clear\'s upto 100 messages in a text channel',
            args: [
                {
                    key: 'number',
                    prompt: 'No of Messages to delete (max. 100)',
                    type: 'string'
                }
            ],
            clientPermissions: [
                'MANAGE_MESSAGES'
            ],
            userPermissions: [
                'MANAGE_MESSAGES'
            ]
        })
    }

    async run(message, args) {
        if (isNaN(Number(args.number))) return message.reply("Please provide a valid number")
        if (Number(args.number) > 100) return message.reply("You can only delete 100 messages at a time")
        if (Number(args.number) < 1) return message.reply("You should atleast delete 1 message")
        message.channel.bulkDelete(Number(args.number)).then(() => {
            message.channel.send("Deleted Messages").then(msg => setTimeout(() => {
                msg.delete()
            }, 3000))
        })
    }
}