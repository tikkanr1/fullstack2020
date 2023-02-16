//create constants
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))



//define persons
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

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
app.get('/info', (request, response) =>
  response.send(
    `Phonebook has info for ${persons.length} people. <br><br>${new Date()}`
  )
)

//display persons
app.get('/api/persons', (request, response) => response.json(persons))

//display single person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(persons => persons.id === id)
    
    //error response
    if (!person) return response.status(404).end()
    response.json(person)
})

//add method to delete a person
app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter((person) => person.id !== +request.params.id)

    response.status(204).end()
})

//add method for adding persons
app.post("/api/persons", (request, response) => {
    const body = request.body

    //name missing
    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }

    //number missing
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }
  
    //already exists
    if (persons.some((person) => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

    const person = {
        id: Math.floor(Math.random()*999999),
        name: body.name,
        number: body.number
    }
    
    persons.push(person)
    response.json(person)
})

  

//wait for input on port
app.listen(port, () => console.log(`Server listening on port ${port}.`))
