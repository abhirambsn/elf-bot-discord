const mongoose = require('mongoose')

const schema = mongoose.Schema({
    _id: { type: String, required: true },
    adminRoles: { type: Array, required: true },
    modRoles: { type: Array, required: true }
})

module.exports = mongoose.model('Roles', schema)