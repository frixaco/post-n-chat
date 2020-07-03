const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    // comments: [String],
    // likes: Number,
    date: { type: Date, default: Date.now },
    imglink: String
})

module.exports = model('Post', schema, 'posts')