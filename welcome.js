const welcomeModel = require('./models/WelcomeData')

module.exports = (client) => {

    client.on('guildMemberAdd', async member => {
        const msg = await welcomeModel.findOne({ _id: member.guild.id }).exec()
        if (msg) {
            const channel = member.guild.channels.cache.get(msg.channelId)
            const text = msg.text.replace(/<@>/g, `<@${member.id}>`)
            channel.send(text)
        }
    })
}