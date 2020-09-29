import React, { useState, useEffect } from 'react';
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null)
  const [status, setStatus] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        //console.log(initialPersons);
      })
  }, [])

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    //console.log(event.target.value)
  }

  const removePerson = (id) => {
    const p = persons.find(person => person.id === id)
    //console.log("removing");

    if (window.confirm(`Do you want to remove ${p.name} from the list`)) {
      //console.log(id);
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Removed ${p.name} from the list`)
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        });
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      const p = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const changedPerson = { ...p, number: newNumber }
      if (window.confirm(`${p.name} is already on the list, do you want to replace the old number with a new one?`)) {
        personService
          .update(p.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
            setStatus(true)
            setNotification(`${p.name} number changed to ${p.number}`)
            setTimeout(() => {
              setNotification(null)
            }, 4000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setStatus(false);
            setNotification(
              `Note '${p.name}' was already removed from server`
            )
            setTimeout(() => {
              setNotification(null)
            }, 4000)
            setPersons(persons.filter(person => person.id !== p.id))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setStatus(true)
          setNotification(`${newName} has been added to the list`)
          setTimeout(() => {
            setNotification(null)
          }, 4000)
          setNewName('')
          setNewNumber('')
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setStatus(false)
          setNotification(`Error: ${error.response.data.error}`)
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
    }
  }
  const Notification = ({ message, status }) => {
    if (message === null) {
      return null
    }
    else if (!status) {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
    else {
      return (
        <div className="notification">
          {message}
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} status={status} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName} nameChange={handleNameChange}
        number={newNumber} numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} removePerson={removePerson} />
    </div>
  )

}


export default App;
