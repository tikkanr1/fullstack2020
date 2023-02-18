//create constants
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const Person = require('./models/person')
app.use(cors())
app.use(express.static('build'))

//use express
app.use(express.json())

//use morgan middleware for logging HTTP requests
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

morgan.token('body', function (request) {
  return JSON.stringify(request.body)
})

//add page for info
app.get('/info', (request, response, next) =>
  Person.countDocuments()
    .then(count =>
      response.send(
        `Phonebook has info for ${count} people. <br><br>${new Date()}`
      )
    )
    .catch(error => next(error))

)

//display persons
app.get('/api/persons', (request, response) =>
  Person.find().then((data) => response.json(data))
)

//display single person
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

//update existing person
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true , runValidators: true }
  )
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

//add method to delete a person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => {
      next(error)
    })
})

//add method for adding persons
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  //create person
  const person = new Person({
    id: Math.floor(Math.random()*999999),
    name: body.name,
    number: body.number
  })

  //save person
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      console.log('asd')
      next(error)
    })
})


// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

//wait for input on port
app.listen(port, () => console.log(`Server listening on port ${port}.`))
