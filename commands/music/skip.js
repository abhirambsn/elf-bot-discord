const Commando = require('discord.js-commando')


module.exports = class Skip extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Skip\'s the current Song',
            clientPermissions: ['SPEAK', 'CONNECT'],
        })
    }

    async run(message) {
        this.client.distube.skip(message)
    }

}