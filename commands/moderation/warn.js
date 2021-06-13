const roleModel = require('@models/roles')
const warningModel = require('@models/warnings')

const Commando = require('discord.js-commando')

module.exports = class Warn extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "warn",
            argsCount: 2,
            group: 'moderation',
            memberName: 'warn',
            description: 'Warns the Mentioned user with a reason',
            args: [
                {
                    key: 'user',
                    prompt: '<@ User to warn (mention)>',
                    type: 'string'
                },
                {
                    key: 'reason',
                    prompt: '<reason>',
                    type: 'string'
                }
            ],
            clientPermissions: [
                'KICK_MEMBERS',
                'BAN_MEMBERS'
            ],
            userPermissions: [
                'KICK_MEMBERS',
                'BAN_MEMBERS'
            ],

        })
    }

    async run(message, args) {
        const target = message.mentions.users.first()
        if (!target) return message.reply("Please tag a user to warn")

        let reason = args['reason']
        if (!reason) return message.reply("Please specify a reason for the warning")

        reason = args['reason']

        let warnCount = 0
        const pendingWarning = await warningModel.find({ guild_id: message.guild.id, user_id: target.id }).exec()
        if (!pendingWarning) {
            const newWarning = await warningModel.create({
                guild_id: message.guild.id,
                user_id: target.id,
                reason: String(reason)
            })
            newWarning.save()
        } else {
            const newWarning = await warningModel.create({
                guild_id: message.guild.id,
                user_id: target.id,
                reason: String(reason)
            })
            newWarning.save()
            warnCount = pendingWarning.length
        }
        message.reply(`<@${target.id}> has been warned,\n **Reason :** *${reason}*, this user has **${warnCount}** previous warnings`)
    }
}
