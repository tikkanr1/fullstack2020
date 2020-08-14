import React, { useState, useEffect } from 'react'
import ShowPersons from "./components/ShowPersons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
    setPersons(response.data)
    })
  }, [])  

  const changeName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const changePhone = (event) => {
    event.preventDefault()
    setNewPhone(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }
    if (persons.some(person => person.name === personObject.name)) {
      window.alert(personObject.name + " is already added to phonebook")
    } else {
      setPersons(persons.concat(personObject))
    }
  }

  const filterPersons = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} filterPersons={filterPersons}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} newPhone={newPhone} addPerson={addPerson} changeName={changeName} changePhone={changePhone}/>
      <h2>Numbers</h2>
      <div>
        <ShowPersons newFilter={newFilter} persons={persons}/>
      </div>
    </div>
  )

}

export default App