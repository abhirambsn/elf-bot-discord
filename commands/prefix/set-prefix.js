const prefixModel = require("../../models/prefix")

module.exports = {
    commands: ["setprefix", "prefix"],
    argMin: 1, 
    argMax: 1,
    arguments: ["<Prefix Symbol>"],
    permissions: ["ADMINISTRATOR"],
    permissionError: "Only Admins can run this command",
    callback: async (message, arguments, text) => {
        const curPrefix = await prefixModel.findOne({ _id: message.guild.id }).exec()
        if (!curPrefix) {
            const newPrefix = await prefixModel.create({
                _id: message.guild.id,
                prefix: String(arguments[0])
            })
            newPrefix.save()
        } else {
            curPrefix.prefix = String(arguments[0])
            curPrefix.save()
        }
        message.reply(`Prefix Changed Successfully from *${curPrefix.prefix}* to **${String(arguments[0])}**`)
    }
}