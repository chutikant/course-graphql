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

//use bodyParsor to send data from user
app.use(bodyParsor.json())
app.use(bodyParsor.urlencoded({extended : true}))

app.use('/posts' ,postRoute)
app.use(morgan('dev'))


app.post('/login' , async (req,res) => {
    const {username , password} = req.body
    const token = await User.createAccessToken(username,password)
    if(!token){
        return res.sendStatus(401)//Unauthorized
    } 
    return res.json({ token })
  })


app.listen(3000,()=> {
    console.log('listen on port 3000')
})
