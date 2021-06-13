const Commando = require('discord.js-commando')

module.exports = class SetNickname extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setnickname',
            aliases: ['nickname'],
            description: "Change Nickname of the mentioned user",
            argsType: 'multiple',
            group: 'misc',
            memberName: 'setnickname'
        })
    }

    async run(message, args) {
        const target = message.mentions.users.first()
        if (!target) return message.reply("Please specify a user to set/change nickname")

        const member = message.guild.members.cache.get(target.id)
        args.shift()

        const nickname = args.join(' ')
        member.setNickname(nickname)

        message.reply(`<@${target.id}> you nickname was changed to ${nickname}`)
    }
}