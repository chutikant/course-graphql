const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema =  mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    authorId: ObjectId
}, { timestamp: true, versionkey: false })


module.exports = mongoose.model('Post', postSchema);
