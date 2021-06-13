const Commando = require('discord.js-commando')

module.exports = class GiveRole extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'give-role',
            aliases: ["gr"],
            group: 'moderation',
            memberName: 'giverole',
            argsCount: 2,
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Gives a role/roles to the mentioned user'
        })
    }

    async run(message, args) {
        const target = message.mentions.users.first()
        if (!target) return message.reply("Please Specify a user to give a role")

        const roles = message.mentions.roles.keyArray()
        if (!roles) return message.reply("Please Specify a valid role to give")

        const member = message.guild.members.cache.get(target.id)
        let msg = `<@${target.id}> now has the following Roles: `

        roles.forEach(role => {
            const guild_role = message.guild.roles.cache.get(role)
            member.roles.add(guild_role)
            msg += `${guild_role} `
        })

        message.reply(msg)
    }
}