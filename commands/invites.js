module.exports = {
    commands: ['invites'],
    description: "Retrieves the no of members invited by each member (top 3)",
    permissions: [],
    callback: message => {
        const { guild } = message
        guild.fetchInvites().then((invites) => {
            const counter = {}
            invites.forEach((invite) => {
                const { uses, inviter } = invite
                const { username, discriminator } = inviter

                const name = `${username}#${discriminator}`

                counter[name] = (counter[name] || 0) + uses
            })

            let msg = "Invite: "

            const sorted = Object.keys(counter).sort(
                (a, b) => counter[b] - counter[a]
            )

            sorted.length = 3

            for (const invite of sorted) {
                const count = counter[invite]
                msg += `\n${invite} has invited ${count} member(s) :)`
            }

            message.reply(msg)
        })
    }
}