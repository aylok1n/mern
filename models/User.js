const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String, required: true },
    сhats: [{ type: Types.ObjectId, ref: 'Chat' }]
})

module.exports = model('User', schema)