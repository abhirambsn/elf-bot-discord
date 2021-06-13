const mongoose = require('mongoose')

const schema = mongoose.Schema({
    guildId: { type: String, required: true },
    userId: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('DailyReward', schema)