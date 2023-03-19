const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const tokenUser = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(tokenUser, process.env.SECRET)


  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router