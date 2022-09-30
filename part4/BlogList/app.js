const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const cors = require('cors')

const blogsRouter = require('./routes/blogs')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const middleware = require('./utils/middleware')

const app = express()

// const mongoUrl = 'mongodb://localhost/bloglist'
const url = config.MONGODB_URI
// console.log('connecting to ', url)
mongoose.connect(url).then(() => {
    console.log('connected to MongoDB');
}).catch(error => { 
    console.log('error connecting to MongoDB', error.message);
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

