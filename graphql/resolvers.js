const { Post, User } = require('../models')

const resolvers = {
    //step2: format data that will be rendered to user
    Tag: {
        posts: async (tag) => {
            const posts = await Post.find({ tags: tag.name })
            return posts
        }
    },
    Post: {
        id: (post) => { return post._id },
        author: async (post) => {
            const user = await User.findById(post.authorId)
            return user
        },
        tags: (post) => {
            return post.tags.map((tag) => {
                return { name: tag }
            })
        },
        content: () => {
            return 'pook:)'
        }
    },
    User: {
        id: (user) => { return user._id },
        posts: async (user) => {
            const posts = await Post.find({ authorId: user._id })
            return posts
        }
    },
    //step1: query data from database
    Query: {
        posts: async (obj, { tag, tags }) => {
            if (tags) {
                const post = await Post.find({ tags: { $in: tags } })
                return post
            }
            if (tag) {
                const post = await Post.find({ tags: tag })
                return post
            }
            //all posts
            const post = await Post.find()
            return post
        },
        post: async (obj, { id }) => {
            const post = await Post.findOne({ _id: id })
            return post
        },
        users: async () => {
            const users = await User.find()
            return users
        },
        me: async (obj, args, context) => {
            return context.user
        }
    },
    Mutation: {
        login: async (obj, { username, password }) => {
            const token = await User.createAccessToken(username, password)
            return token
        },
        signup: async (obj, { username, password }) => {
            const user = await User.signup(username, password)
            return user
        },
        createPost: async (obj, { data }, context) => {
            //const res = context.user
            const res = await Post.createPost(data, context.user)
            //console.log(res)
            return res
        }
        // createPost : 
        // args.data.
    }
}

module.exports = resolvers