const logger = require('./logger')

function errorHandler(error, _request, response, next) {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  logger.error(error.message)
  next(error)
}

module.exports = {
  errorHandler
}