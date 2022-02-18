const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    with: { type: Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    date: { type: Date, default: Date.now },
    messages: [{ type: Types.ObjectId, ref: 'Message' }]
})

module.exports = model('Message', schema)