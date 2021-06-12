const path = require('path')
const fs = require('fs')

module.exports = (client) => {

    const commands = []

    const readCommand = dir => {
        const commandBaseFileName = "base.js"
        const commandBase = require(`./commands/${commandBaseFileName}`)

        const files = fs.readdirSync(path.join(__dirname, dir))

        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommand(path.join(dir, file))
            } else if (file !== commandBaseFileName) {
                const option = require(path.join(__dirname, dir, file))
                commands.push(option)
                if (client) commandBase(option)
            }
        }
    }

    readCommand('commands')

    return commands
}