const mongoose = require('mongoose')
require('dotenv').config()

/*
//require password
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
*/

//constants for values
//const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI


//connect
mongoose.connect(url, { useNewUrlParser: true })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

//schema for creating person
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})


const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

//show phonebook or save
if (process.argv.length === 3) {
  console.log('phonebook: ')
  Person.find({}).then(result => result.forEach(person => {
    console.log(person.name, person.number)
    mongoose.connection.close()
  }))
} else {
  console.log(process.argv.length)
  person.save().then(() => {
    console.log(`added ${name}, number ${number} to the phonebook.`)
    console.log('note saved!')
    mongoose.connection.close()
  })
}