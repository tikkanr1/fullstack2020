const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

//get users
userRouter.get('/', async (_request, response) =>
response.json( await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
)
)

//add users
userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10

  //validate username
  if (!username || username.length < 3) {
    return response.status(400).json({
      error: 'The username must contain at least 3 characters',
    })
  }

  //validate password 
  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'The password must contain at least 3 characters',
    })
  }

  //validate unique username
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: "The username must be unique",
    })
  }


  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter