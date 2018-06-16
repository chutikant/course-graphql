const { Post, User } = require('../models')
const DataLoader = require('dataloader');

const resolvers = {
    //step2: format data that will be rendered to user
    // all data will map with typedefs
    Tag: {
        posts: async (tag) => {
            const posts = await Post.find({ tags: tag.name })
            return posts
        }
    },
    Post: {
        id: (post) => { return post._id },
        author: async (post, args, context) => {
            //const user = await User.findById(post.authorId) //change to dataLaoder
            const user = await context.loaders.userLoader.load(post.authorId)
            return user
        },
        tags: (post) => {
            return post.tags.map((tag) => {
                return { name: tag }
            })
        }
    },
    User: {
        id: (user) => { return user._id },
        posts: async (user,args,context) => {
              //  postsByUserIdLoader: createPostsByUserIdLoader
            const posts = await context.loaders.postsByUserIdLoader.load(user._id)
          //  const posts = await Post.find({ authorId: user._id })
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
            console.log(`me: ${context.user}` )
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
        //resolver have 3 arguments:
        //1. obj 
        //2. argument that user passed 
        //3.context is variable that to be shared all project. (ex. token)
        createPost: async (obj, { data }, context) => {
            
            if(context.user == null) {
              // const errors = {'message': 'please login'}
              throw new Error('User is not logged in (or authenticated).');
               
            }
            const res = await Post.createPost(data, context.user)
            return res
        }
    }
}

module.exports = resolvers