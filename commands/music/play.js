const Commando = require('discord.js-commando')


module.exports = class Play extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['p'],
            group: 'music',
            memberName: 'play',
            description: 'Play\'s the Song mentioned',
            clientPermissions: ['SPEAK', 'CONNECT'],
            args: [
                {
                    key: 'url',
                    prompt: 'Song Name or URL',
                    type: 'string'
                }
            ]
        })
    }

    async run(message, args) {
        const music = args.url
        this.client.distube.play(message, music)
    }

}