const Commando = require('discord.js-commando')

module.exports = class NewTicket extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'create-ticket',
            aliases: ['ticket'],
            group: 'ticketing',
            memberName: 'create-ticket',
            description: 'Creates a Private ticket channel for you to contact support'
        })
    }

    async run(message) {
        const category = message.guild.channels.cache.find(channel => channel.name === 'Tickets' && channel.type === "category")
        if (!category) {
            const newCategory = await message.guild.channels.create('Tickets', {
                type: 'category',
            })
            const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`)
            channel.setParent(newCategory.id)
            channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            })
            channel.updateOverwrite(message.author, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            })
            const reactionMessage = await channel.send("Thank you for contacting support")
            try {
                await reactionMessage.react("✅")
                await reactionMessage.react("🔐")
            } catch (err) {
                channel.send("Emoji Error")
                throw err
            }

            const collector = reactionMessage.createReactionCollector(
                (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
                { dispose: true }
            )

            collector.on('collect', (reaction, user) => {
                switch (reaction.emoji.name) {
                    case "✅":
                        channel.updateOverwrite(message.author, { SEND_MESSAGES: false })
                        break
                    case "🔐":
                        channel.send("This ticket is now closed and the channel will be deleted in 10 seconds")
                        let timeout = 10
                        setTimeout(() => {
                            channel.edit(`This ticket is now closed and the channel will be deleted in ${timeout} seconds`)
                            timeout--
                        }, 10000)
                        break
                }
            })
            message.channel.send(`We will be with you in a while at ${channel}`).then((msg) => {
                setTimeout(() => msg.delete())
                setTimeout(() => message.delete())
            })
        } else {
            const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`)
            channel.setParent(category.id)
            channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
            })
            channel.updateOverwrite(message.author, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            })
            const reactionMessage = await channel.send("Thank you for contacting support")
            try {
                await reactionMessage.react("✅")
                await reactionMessage.react("🔐")
            } catch (err) {
                channel.send("Emoji Error")
                throw err
            }

            const collector = reactionMessage.createReactionCollector(
                (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
                { dispose: true }
            )

            collector.on('collect', (reaction, user) => {
                switch (reaction.emoji.name) {
                    case "✅":
                        channel.updateOverwrite(message.author, { SEND_MESSAGES: false })
                        break
                    case "🔐":
                        channel.send("This ticket is now closed and the channel will be deleted in 10 seconds")
                        setTimeout(() => {
                            channel.delete()
                        }, 10000)
                        break
                }
            })
            message.channel.send(`We will be with you in a while at ${channel}`).then((msg) => {
                setTimeout(() => msg.delete(), 5000)
                setTimeout(() => message.delete(), 8000)
            })
        }
    }
}