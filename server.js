const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParsor = require('body-parser')
const { Post, User } = require('./models')
const { authMiddleware } = require('./lib/auth')

const morgan = require('morgan')
const logMiddleware = (req, res, next) => {
    console.log(req.url)
    next()
}

const postRoute = require('./routes/postRoute')
// graphql apollo-server
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

//**[ require graphql ]
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')


//use bodyParsor to send data from user
app.use(bodyParsor.json())
app.use(bodyParsor.urlencoded({ extended: true }))

app.use('/posts', postRoute)

app.use(morgan('dev'))
app.use(authMiddleware)


app.use('/graphql', graphqlExpress((req, res) => {
    return {
        schema: schema,
        context: {
            user: req.user
        }
    }
}))

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

app.post('/signup', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.sendStatus(400)
    }
    try {
        const user = await User.signup(username, password)
        res.json({
            _id: user._id,
            username: user.username
        })
    } catch (e) {
        if (e.name === 'DuplicateUser') { // err.message.match
            return res.status(400).send(e.message)
        }
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const token = await User.createAccessToken(username, password)
    if (!token) {
        return res.sendStatus(401)//Unauthorized
    }
    return res.json({ token })
})

app.post('/me', (req, res) => {
    if (!req.user) {
        return res.sendStatus(401)
    }
    res.json(req.user)
})


app.listen(3000, () => {
    console.log('listen on port 3000')
})
