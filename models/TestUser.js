const { Schema, model } = require('mongoose')

const schema = new Schema({
    phone: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String },
    university: { type: String },
    birthday: { type: String },
    startUniversity: { type: String },
    endUniversity: { type: String },
    token: { type: String },
})

module.exports = model('TestUser', schema)