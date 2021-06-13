const Commando = require('discord.js-commando')

module.exports = class GiveRole extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'remove-role',
            aliases: ["rr"],
            group: 'moderation',
            memberName: 'removerole',
            argsCount: 2,
            clientPermissions: [
                'ADMINISTRATOR'
            ],
            userPermissions: [
                'ADMINISTRATOR'
            ],
            description: 'Removes a role/roles from the mentioned user'
        })
    }

    async run(message, args) {
        const target = message.mentions.users.first()
        if (!target) return message.reply("Please Specify a user to remove a role")

        const roles = message.mentions.roles.keyArray()
        if (!roles) return message.reply("Please Specify a valid role to remove")

        const member = message.guild.members.cache.get(target.id)
        let msg = `<@${target.id}> now doesn\'t have the following Roles: `

        roles.forEach(role => {
            const guild_role = message.guild.roles.cache.get(role)
            if (member.roles.cache.get(guild_role.id)) {
                member.roles.remove(guild_role)
                msg += `${guild_role} `
            } else {
                message.reply(`<@${target.id}> does not have the ${guild_role.name} role`)
            }
        })

        message.reply(msg)
    }
}