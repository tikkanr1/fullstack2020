const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const tokenExtractor = (request, _response, next) => {
  const authorizationHeader = request.headers['authorization']
  if (authorizationHeader && authorizationHeader.startsWith('authenticate ')) {
    request.authToken = authorizationHeader.slice(13)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const authAttempt = jwt.verify(request.authToken, process.env.SECRET)
  const user = await User.findById(authAttempt.id)

  if (!user) {
    return response.status(401).json({ error: 'The user was not found' })
  }
  request.authUser = user
  next()
}

const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'The loginToken is missing or wrong',
    })
  }

  logger.error(error.message)
  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler
}