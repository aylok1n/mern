const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    members: [{ type: Types.ObjectId, ref: 'User', required: true }],
    messages: [{
        senderId: { type: Types.ObjectId, ref: 'User', required: true },
        text: { type: String },
        date: { type: Date, default: Date.now },
    }]
})

module.exports = model('Chat', schema)