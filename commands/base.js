const profileModel = require("../models/profile")

const prefixModel = require('../models/prefix')
const globalPrefix = process.env.PREFIX

const checkPermissions = (permissions) => {
    const validPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'VIEW_CHANNEL',
        'READ_MESSAGES',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'EXTERNAL_EMOJIS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_ROLES_OR_PERMISSIONS',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown Permssion "${permissions}"`)
        }
    }
}

const allCommands = {}
const guildPrefixes = {}

module.exports = (options) => {
    let {
        commands,
        permissions = [],
    } = options

    if (typeof commands === 'string') {
        commands = [commands]
    }

    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
    }

    checkPermissions(permissions)

    for (const command of commands) {
        allCommands[command] = {
            ...options,
            commands,
            permissions
        }
    }

}

module.exports.listen = (client) => {
    client.on('message', async (message) => {
        const { member, content, guild } = message

        const prefix = guildPrefixes[guild.id] || globalPrefix
        console.log(prefix);

        addXp(guild.id, member.id, 5, message)

        const providedArguments = content.split(/[ ]+/)
        const name = providedArguments.shift().toLowerCase()

        if (name.startsWith(prefix)) {
            const command = allCommands[name.replace(prefix, '')]
            if (!command) {
                return
            }
            const {
                permissions = [],
                permissionError = "You don\'t have permission to run this command",
                requiredRoles = [],
                argMin = 0,
                argMax = null,
                args,
                callback
            } = command

            for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                    message.reply(`${permissionError}`)
                    return
                }
            }


            for (const reqRole of requiredRoles) {
                const role = guild.roles.cache.find(role => role.name === reqRole)

                if (!role || !member.roles.cache.has(role.id)) {
                    message.reply(`You must have the ${reqRole} to use this command`)
                }
            }



            if (providedArguments.length < argMin || (argMax !== null && providedArguments.length > argMax)) {
                message.reply(`Incorrect Syntax! Correct Syntax ${name} ${args.join(' ')}`)
            }

            callback(message, providedArguments, providedArguments.join(' '))
        }
    })
}

const levelReq = level => level*level*150

const addXp = async (guildId, userId, xp, message) => {
    const curXp = await profileModel.findOne({ guildId: guildId, userId: userId }).exec()
    if (!curXp) {
        const newProfile = await profileModel.create({
            guildId: guildId,
            userId: userId,
            xp: xp
        })

        newProfile.save()
    } else {
        curXp.xp += xp
        const neededXp = levelReq(curXp.level)
        if (curXp.xp > neededXp) {
            curXp.level += 1
            curXp.xp -= neededXp

            message.reply(`You levelled up to level ${curXp.level} with ${curXp.xp} experience`)
        }
        curXp.save()
    }

}

module.exports.loadPrefixes = (client) => {
    client.guilds.cache.forEach(async (guild) => {
        const guildId = guild.id
        const result = await prefixModel.findOne({ _id: guild.id })
        guildPrefixes[guildId] = result.prefix
    })
}