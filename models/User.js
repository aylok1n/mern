const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    image: { type: String, default: 'https://sun9-61.userapi.com/impg/GbCM-QLx6juLVlfImS7-6GspWildEFp8Z_lU3w/hlTx0GTC46E.jpg?size=930x682&quality=95&sign=cb0a2a0d4240edac58823436edb04696&type=album' },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    password: { type: String, required: true }
})

module.exports = model('User', schema)