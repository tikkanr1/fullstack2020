const express = require('express')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const router = express.Router()

//get person from database
router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//add blog to database
router.post('/', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.authUser
  const blogData = new Blog({ title, author, url, likes, user: user._id })
  const blogSaved = await blogData.save()
  user.blogs.push(blogSaved._id)
  await user.save()
  response.status(201).json(blogSaved)
})

//delete blog from database
router.delete('/:id', async (request, response) => {
  const authAttempt = jwt.verify(request.authToken, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(204).end()

  if (blog.user._id.toString() !== authAttempt.id)
    return response.status(403).json({error: 'This blog was created by another user'})
  await Blog.deleteOne({ _id: request.params.id })
  response.status(204).end()
})

//update blog in database
router.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = {title, author, url, likes}
  const options = {new: true, runValidators: true, overwrite: true}
  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, options)

  if (!blog) {
    return response.status(404).end()
  }
  response.json(blog)
})


module.exports = router