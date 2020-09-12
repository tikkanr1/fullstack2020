import React from "react";

const showPersons = ({newFilter, persons, deleteButton}) => {
      return (
        persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteButton(person.id)}>delete</button>
        </p>
      ))
    } 

export default showPersons;