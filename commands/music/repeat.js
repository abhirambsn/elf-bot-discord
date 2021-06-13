const Commando = require('discord.js-commando')


module.exports = class Skip extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'repeat',
            aliases: ["loop"],
            group: 'music',
            memberName: 'repeat',
            description: 'Repeat\'s the current Song or queue',
            clientPermissions: ['SPEAK', 'CONNECT'],
            args: [
                {
                    key: 'repeatMode',
                    prompt: '0: Off, 1: Repeat Queue, 2: Repeat Current Song',
                    type: 'string'
                }
            ]
        })
    }

    async run(message, args) {
        const mode = Number(args.repeatMode)
        if (isNaN(mode)) return message.reply("Please Choose a correct mode")
        this.client.distube.setRepeatMode(message, parseInt(args.repeatMode));
    }

}