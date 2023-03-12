const Blog = require('../models/blog')
const express = require('express')
const router = express.Router()

router.get('/', (_request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

router.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = router