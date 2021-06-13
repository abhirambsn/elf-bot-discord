require('module-alias/register')

const mongoose = require('mongoose')

const MongoClient = require('mongodb').MongoClient
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider
const path = require('path')

const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const DisTube = require('distube')

require('dotenv').config()

const welcome = require('@features/welcome')
const farewell = require('@features/farewell')

const client = new Commando.CommandoClient({
    owner: process.env.OWNER_ID,
    commandPrefix: "$"
})


// Music Config

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true })

client.distube
    .on("playSong", (message, queue, song) => {
        const embed = new MessageEmbed()
            .setColor("#7b00b0")
            .setAuthor("ElfBot Music")
            .addField("Now Playing", `\n**${song.name}** - *${song.formattedDuration}*\nRequested by: **${song.user}**\n${status(queue)}`)
        message.channel.send(embed)
    })
    .on("addSong", (message, queue, song) => {
        const embed = new MessageEmbed()
            .setColor("#005fd4")
            .setAuthor("ElfBot Music")
            .addField("Added to Queue", `\n**${song.name}** - *${song.formattedDuration}*  added to the queue by ${song.user}`)
        message.channel.send(embed)
    })
    .on("playList", (message, queue, playlist, song) => {
        const embed = new MessageEmbed()
            .setColor("")
            .setAuthor("ElfBot Music")
            .addField("Playing Playlist", `\n**${playlist.name}** playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing **${song.name}** - *${song.formattedDuration}*\n${status(queue)}`)
        message.channel.send(embed)
    })
    .on("addList", (message, queue, playlist) => {
        const embed = new MessageEmbed()
            .setColor("#ff7300")
            .setAuthor("ElfBot Music")
            .addField("Added Playlist", `\n**${playlist.name}** playlist (${playlist.songs.length} songs) added to queue\n${status(queue)}`)
        message.channel.send(embed)
    })

// Mongo Provider for Commando

client.setProvider(
    MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
        .then((client) => {
            return new MongoDBProvider(client, 'myFirstDatabase')
        })
).then(() => { })

client.on('ready', () => {

    console.log("Bot Ready");

    client.registry
        .registerGroups([
            ['misc', "Misc Commands"],
            ['moderation', "Moderation Commands"],
            ['server', "Server Commands"],
            ['economy', "Economy Commands"],
            ['polls', "Polling Commands"],
            ['music', "Music Commands"],
            ['ticketing', "Support Ticket Commands"]
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, 'commands'))

    welcome(client)
    farewell(client)

})

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (error) => {
    if (!error) {
        console.log("Database Connected!!");
        client.login(process.env.TOKEN)
    } else {
        console.error(error);
    }
})