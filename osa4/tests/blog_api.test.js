const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_api_test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogPromises = helper.initialBlogs.map((blog) => new Blog(blog).save())
  await Promise.all(blogPromises)
})

//tests for indexing blogs
describe('indexing blogs', () => {
  test('response has status code 200', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
  })

  test('response has JSON content type', async () => {
    const response = await api.get('/api/blogs')
    expect(response.headers['content-type']).toMatch(/application\/json/)
  })
  
  test('all blogs are present in the response', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('identifier property is id and not _id', async () => {
    const blog = (await api.get('/api/blogs')).body[0]
    expect(blog._id).toBeUndefined()
    expect(blog.id).toBeDefined()
  })
})

//tests for creating blogs
describe('creating a blog', () => {
  test('should succeed with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogExampleNoId)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDatabase()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(finalBlogs.map((blog) => blog.title)).toContain(helper.blogExampleNoId.title)
  })

  test('should set the likes property to 0 by default', async () => {
    const response = await api.post('/api/blogs').send(helper.blogExampleNoId).expect(201)
    expect(response.body.likes).toBe(0)
  })

  test('should fail with missing properties', async () => {
    api.post('/api/blogs').send({}).expect(400)
  }, 100000)
})

//tests for deleting blogs
describe('deleting a blog', () => {
  test('should succeed with a valid ID', async () => {
    const id = (await Blog.findOne({})).id
    await api.delete(`/api/blogs/${id}`).expect(204)
    const blogs = await helper.blogsInDatabase()
    const ids = blogs.map((blog) => blog.id)
    expect(ids).not.toContain(id)
  })
})

//tests for updating blogs
describe('updating a blog', () => {
  test('should succeed with valid properties', async () => {
    const initialId = '5a422b3a1b54a676234d17f9'
    await api
      .put(`/api/blogs/${initialId}`)
      .send(helper.blogExampleNoId)
      .expect(200)
    const blog = await Blog.findById(initialBlog.id)
    for (const key of Object.keys(helper.blogExampleNoId))
      expect(blog[key]).toEqual(helper.blogExampleNoId[key])
  })

  test('should fail with missing properties', async () => {
    await api.put(`/api/blogs/${helper.blogExampleNoId.id}`).send({}).expect(400)
  })
})
  

afterAll(() => mongoose.connection.close())