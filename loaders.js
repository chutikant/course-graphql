const DataLoader = require('dataloader');
const { Post, User } = require('./models')

const createUserLoader = () => {
    return new DataLoader(async (keys) => {
        const rows = await User.find({
            _id: { $in: keys }
        })

        const results = keys.map((key) => {
            return rows.find((row) => {
                return `${row._id}` === `${key}`
            })
        })

        return results
    }, {
            cacheKeyFn: (key) => `${key}` //คีย์ที่ได้มาให้มองเป็นสตริงทั้งหมด ใช้ในการกำหนด catch key
            //ค่าคีย์จะมีแค่ค่าเดียวเสมอ ให้เพิ่มตัวแปรหลังๆเอา  cacheKeyFn: (key) => '${key.id}:${key.username}'
        })
}

const createPostsByUserIdLoader = () => {
    return new DataLoader(async (userIds) => {
        const rows = await Post.find({
            authorId: { $in: userIds }
        })

        const results = userIds.map((userId) => {
            return rows.filter((row) => {
                return `${row.authorId}` === `${userId}`
            })
        })

        return results
    }, {
            cache: true,
            cacheKeyFn: (userId) => `${userId}`
        })
}

module.exports = {
    createUserLoader,
    createPostsByUserIdLoader
}