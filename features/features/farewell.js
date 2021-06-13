const farewellModel = require('@models/FarewellData')

module.exports = (client) => {

    client.on('guildMemberRemove', async member => {
        const msg = await farewellModel.findOne({ _id: member.guild.id }).exec()
        if (msg) {
            const channel = member.guild.channels.cache.get(msg.channelId)
            const text = msg.text.replace(/<@>/g, `<@${member.id}>`)
            channel.send(text)
        }
    })
}