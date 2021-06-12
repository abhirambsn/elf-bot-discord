module.exports = {
    commands: ['ping'],
    args: [],
    description: "Pings the Bot",
    permissionError: "You don\'t have permission to use this command",
    argMin: 0,
    argMax: 0,
    callback: (message, args, text) => {
        message.reply("Pong!!")
    },
    permissions: [],
    requiredRoles: []
}