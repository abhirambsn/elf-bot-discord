const Commando = require('discord.js-commando')

module.exports = class Unmute extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'unmute',
            group: 'moderation',
            memberName: 'unmute',
            description: "Mutes a user",
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['ADMINISTRATOR'],
        })
    }

    async run(message) {
        const target = message.mentions.users.first()
        if (!target) return message.reply("Please specify a user to mute")

        const mutedRole = message.guild.roles.cache.find(role => role.name === "Muted")
        if (!mutedRole) {
            return message.reply("No Muted role found, please create or ask an admin to create a 'Muted' role and place it above all the roles which you want to be affected")
        }
        const targetMember = message.guild.members.cache.get(target.id)
        if (!targetMember.roles.cache.get(mutedRole.id)) return message.reply(`<@${targetMember.id}> was not muted`)
        else targetMember.roles.remove(mutedRole)


        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.overwritePermissions([
                {
                    id: targetMember.user.id,
                    allow: ["SEND_MESSAGES", "CONNECT", "SPEAK"]
                }
            ])
        })

        message.reply(`<@${target.id}> was unmuted`)
    }
}