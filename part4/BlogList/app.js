const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const router = require('./routes/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')

// const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', router)

module.exports = app

