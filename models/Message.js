
const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    from: { type: Types.ObjectId, ref: 'User', required: true },
    to: { type: Types.ObjectId, ref: 'User', required: true, },
    text: { type: String },
    date: { type: Date, default: Date.now },
})

module.exports = model('Message', schema)