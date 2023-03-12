const Blog = require('./models/blog')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//mongoose.createConnection(config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
module.exports = app