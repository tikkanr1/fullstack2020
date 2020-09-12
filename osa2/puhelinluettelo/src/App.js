import React, { useState, useEffect } from 'react'
import ShowPersons from "./components/ShowPersons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService from './services/Persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notif">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
      return null
  }
  return (
      <div className="error">
          {message}
      </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const handleDeletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName} from contacts?`)) {
      deletePerson(id)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone,
      id: persons[persons.length-1].id+1
    }
    if (persons.some(person => person.name === newName)) {
      updatePerson(persons.find(person => person.name === personObject.name))
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          setNotificationMessage(`${newName} was added`)
      })
      .catch(error => {
        setErrorMessage(
          `${error.response.data}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const updatePerson = (toBeUpdated) => {
    const updatedPerson = {
      name: toBeUpdated.name,
      number: newPhone,
      id: toBeUpdated.id
    }

    if(window.confirm(`${toBeUpdated.name} is already added to phonebook, replace the old number with a new one?`)){
      personService
      .update(toBeUpdated.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== toBeUpdated.id ? person : returnedPerson))
        setNewName('')
        setNewPhone('')
      })
      .catch(error => {
        setErrorMessage(
          `The person ${toBeUpdated.name} was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const deletePerson = (id) => {
    personService
      .del(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorMessage(
          `The person was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
  }

  const filterPersons = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Error message={errorMessage}/>
      <Filter newFilter={newFilter} filterPersons={filterPersons}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} newPhone={newPhone} addPerson={addPerson} changeName={changeName} changePhone={changePhone}/>
      <h2>Numbers</h2>
      <div>
        <ShowPersons newFilter={newFilter} persons={persons} deleteButton={handleDeletePerson}/>
      </div>
    </div>
  )

}

export default App
