const mongoose = require('mongoose')

const schema = mongoose.Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    coins: { type: Number, default: 200 },
    bank: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
})

module.exports = mongoose.model('Profile', schema)