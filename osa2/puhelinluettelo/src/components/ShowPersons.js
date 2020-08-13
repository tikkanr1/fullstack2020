import React from "react";

const showPersons = ({newFilter, persons}) => {
    if(newFilter.length > 0) {
      return (
        persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
        <p key={person.number}>{person.name} {person.number}</p>
      ))
    } else {
      return (
        persons.map(person => <p key={person.number}>{person.name} {person.number}</p>)
      )
  }
}

export default showPersons;