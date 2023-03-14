const Blog = require('../models/blog')
const express = require('express')
const router = express.Router()

//get person from database
router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//add person to database
router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

//delete person from database
router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//update person in database
router.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = {title, author, url, likes}
  const options = {new: true, runValidators: true, overwrite: true}
  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, options)
  console.log(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }
  response.json(blog)
})


module.exports = router