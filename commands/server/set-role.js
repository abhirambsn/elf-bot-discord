const Commando = require('discord.js-commando')
const roleModel = require('@models/roles')


module.exports = class SetRole extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'set-role',
            description: 'Set\'s the moderator and the admin role for the server',
            argsType: 'multiple',
            group: 'server',
            memberName: 'set-role',
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['ADMINISTRATOR']
        })
    }

    async run(message, args) {
        if (args.length === 1) {
            const role = message.mentions.roles.keyArray()
            const roleModelQuery = await roleModel.findOne({ _id: message.guild.id }).exec()
            if (roleModelQuery.adminRole !== []) {
                roleModelQuery.adminRole += role
                roleModelQuery.save()
            } else {
                roleModelQuery.adminRole = role
                roleModelQuery.save()
            }
        } else {
            const roles = Array(message.mentions.roles.keyArray())
            const roleModelQuery = await roleModel.findOne({ _id: message.guild.id }).exec()
            if (!roleModelQuery) {
                const adminRole = roles[0]
                roles.shift()
                const newRole = await roleModel.create({
                    _id: message.guild.id,
                    adminRoles: adminRole,
                    modRoles: roles
                })
                newRole.save()
            } else {
                if (roleModelQuery.adminRoles !== []) {
                    roleModelQuery.adminRoles += roles[0]
                } else {
                    roleModelQuery.adminRoles = roles[0]
                }
                roles.shift()
                if (roleModelQuery.modRoles !== []) {
                    roleModelQuery.modRoles += roles
                } else {
                    roleModelQuery.modRoles = roles
                }
                roleModelQuery.save()
            }
        }
        message.reply("Roles Set")
    }
}