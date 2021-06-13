const mongoose = require('mongoose')

const schema = mongoose.Schema({
    guild_id: { type: String, required: true },
    user_id: { type: String, required: true },
    reason: { type: String, required: true },
})

module.exports = mongoose.model('Warning', schema)