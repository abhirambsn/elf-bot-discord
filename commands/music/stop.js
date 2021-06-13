const Commando = require('discord.js-commando')


module.exports = class Stop extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Stop\'s the Songs',
            clientPermissions: ['SPEAK', 'CONNECT'],
        })
    }

    async run(message) {
        this.client.distube.stop(message)
        message.channel.send("Music Stopped")
    }

}