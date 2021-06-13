const Commando = require('discord.js-commando')

module.exports = class Mute extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            group: 'moderation',
            memberName: 'mute',
            description: "Mutes a user",
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['ADMINISTRATOR'],
            argsType: 'multiple'
        })
    }

    async run(message, args) {
        if (args.length < 2) {
            return message.reply(`Correct Syntax: ${message.guild.commandPrefix}mute <User @> <Reason>`)
        }

        const target = message.mentions.users.first()
        if (!target) return message.reply("Please specify a user to mute")

        args.shift()

        const reason = String(args.join(' '))

        const mutedRole = message.guild.roles.cache.find(role => role.name === "Muted")
        if (!mutedRole) {
            return message.reply("No Muted role found, please create or ask an admin to create a 'Muted' role and place it above all the roles which you want to be affected")
        }
        const targetMember = message.guild.members.cache.get(target.id)
        if (targetMember.roles.cache.get(mutedRole.id)) return message.reply(`<@${targetMember.id}> is already muted`)
        targetMember.roles.add(mutedRole)

        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.overwritePermissions([
                {
                    id: targetMember.user.id,
                    deny: ["SEND_MESSAGES", "CONNECT", "SPEAK"]
                }
            ])
        })

        message.reply(`<@${target.id}> muted because of the following reason: **${reason}**`)
    }
}