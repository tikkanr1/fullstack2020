const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const app = express()

//mongoose.createConnection(config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)
module.exports = app