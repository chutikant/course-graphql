const { Post, User } = require('./models')
const { makeExecutableSchema } = require('graphql-tools')
const fs = require('fs') //manage file system
const path = require('path') //join path

const typeDefsPath  = path.join(__dirname, 'graphql' , 'typedefs.graphql')
//typeDefsPath is binary (store in buffer), have to change it to string
const typeDefs = fs.readFileSync(typeDefsPath).toString()
const resolvers = require('./graphql/resolvers')

module.exports = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers    
})