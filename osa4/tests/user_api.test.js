const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const user = new User({
    username: 'user1',
    name: 'userman',
    passwordHash: await bcrypt.hash('password', saltRounds),
  })
  await user.save()
}, 10000)

//tests for creating a new user
describe('User creation', () => {
  test('should create a new user with a unique username', async () => {
    const initialCount = await User.countDocuments()
    const newUser = { username: 'jababa', name: 'original', password: 'something' }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(await User.countDocuments()).toEqual(initialCount + 1)
    expect(await User.exists({ username: newUser.username })).toBeTruthy()
  }, 10000)

  test('should fail with missing properties', () =>
    api.post('/api/users').send({}).expect(400))

  test('should fail with a username shorter than 3 characters', async () => {
    const shortName = { username: 'ja', name: 'original', password: 'something' }
    const response = await api
      .post('/api/users')
      .send(shortName)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('The username must contain at least 3 characters')
  }, 10000)

  test('should fail with a password shorter than 3 characters', async () => {
    const shortPassword = { username: 'jababa', name: 'original', password: 'so' }
    const response = await api
      .post('/api/users')
      .send(shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('The password must contain at least 3 characters')
  }, 10000)

  test('should fail with an existing username', async () => {
    const initialCount = await User.countDocuments()
    const existingUser = { username: 'user1', name: 'original', password: 'something' }

    const response = await api
      .post('/api/users')
      .send(existingUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('The username must be unique')
    expect(initialCount).toEqual(await User.countDocuments())
  })
})

afterAll(() => {
  mongoose.connection.close()
})
