const Commando = require('discord.js-commando')
const { MessageEmbed } = require("discord.js")

module.exports = class NewPoll extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "new-poll",
            aliases: ["poll"],
            group: "polls",
            memberName: 'new-poll',
            description: "Creates a New Poll"
        })
    }

    async run(message, args) {
        const eachLine = args.split('\n')

        message.delete()

        const embed = new MessageEmbed()
            .setAuthor("ElfBot Polls")
            .setColor('#00ffae')
            .setTitle(`Poll by ${message.author.username}`)
            .setDescription("Please React to the below roles to vote your choice")

        embed.addField("Purpose", args)

        message.channel.send({ embed: embed }).then(embedMsg => {
            for (const line of eachLine) {
                const split = line.split('=')
                if (split.length === 1) continue
                const emoji = split[0].trim()
                embedMsg.react(emoji)
            }
        })

    }
}