const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    image: { type: String },
    password: { type: String, required: true }
})

module.exports = model('User', schema)