const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema =  mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    authorId: ObjectId
}, { timestamp: true, versionkey: false })


postSchema.statics.createPost = async function (data, user) {
   return  this.create({
        title: data.title,
        content: data.content,
        tags: data.tags,
        authorId: user.id})

}
module.exports = mongoose.model('Post', postSchema);
