const loadCmd = require('../load')
const prefix = process.env.PREFIX

module.exports = {
    commands: ["help", "h"],
    description: "Help for the Bot",
    callback: (message, arguments, text) => {
        let reply = `Hello I am ElfBot, Your Server Prefix is **${prefix}**, help is below\n\n`

        const commands = loadCmd()

        for (const command of commands) {
            let permissions = command.permissions

            if (permissions) {
                let hasPermission = true
                if (typeof permissions === 'string') {
                    permissions = [permissions]
                }

                for (const permission of permissions) {
                    if (!message.member.hasPermission(permission)) {
                        hasPermission = false
                        break
                    }
                }

                if (!hasPermission) {
                    continue
                }

                const mainCmd = (typeof command.commands === 'string') ? command.commands : command.commands[0]

                const args = command.args ? `${command.args.join(' ')}` : ''
                const { description } = command

                reply += `**${mainCmd}: ${args}** : ${description}\n`
            }
        }
        message.reply(reply)
    }
}