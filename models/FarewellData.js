const mongoose = require('mongoose')


const schema = mongoose.Schema({
    _id: { type: String, required: true },
    channelId: { type: String, required: true },
    text: { type: String, required: true }
})

module.exports = mongoose.model('FarewellData', schema)