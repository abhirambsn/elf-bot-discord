const Commando = require('discord.js-commando')
const Discord = require('discord.js')


module.exports = class Queue extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'Get\'s the Queue',
            clientPermissions: ['SPEAK', 'CONNECT'],
        })
    }

    async run(message) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.reply("Please Be in a voice channel to listen to music")

        let queue = await this.client.distube.getQueue(message);
        const embed = new Discord.MessageEmbed()
            .setColor("#f2ff00")
            .setTitle(`${message.author.tag}\'s Queue`)
            .setAuthor("ElfBot Music")
            .setDescription("Music Queue")
        

        queue.songs.map((song, id) => {
            embed.addField(`Song ${id + 1}`, `${song.name} - ${song.formattedDuration}\n`)
        })

        message.channel.send(embed)
    }

}