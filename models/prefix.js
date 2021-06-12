const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: { type: String, required: true },
    prefix: { type: String, default: '-' }
})

module.exports = mongoose.model('Prefix', schema)