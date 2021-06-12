const mongoose = require('mongoose')

const Discord = require('discord.js')
const client = new Discord.Client()

require('dotenv').config()

const loadCommands = require('./load')

const welcome = require('./welcome')
const farewell = require('./farewell')

client.on('ready', () => {
    const commandBaseFileName = "base.js"
    const commandBase = require(`./commands/${commandBaseFileName}`)

    console.log("Bot Ready");

    loadCommands(client)
    welcome(client)
    farewell(client)

    commandBase.listen(client)
    commandBase.loadPrefixes(client)
    
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