module.exports = {
    commands: ["delete-channel", "delchannel", "deletechannel"],
    argMax: null,
    args: ["channel_name"],
    description: "Delete the current channel or the specified channel if name is given",
    permissionError: "Only Administrators can use this command",
    callback: (message, arguments, text) => {
        if (text !== '') {
            const channel = message.guild.channels.cache.find((channel) => channel.name === text) 
            if (!channel) return message.reply(`${text} channel Not Found`)
            channel.delete()
        }
        else message.channel.delete()
    },
    permissions: ["ADMINISTRATOR"]
}