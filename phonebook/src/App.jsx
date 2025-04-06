import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filter, onChange}) => {
  return (
    <div>
    filter show with: <input value={filter} onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({onSubmit, name, onNameChange, number, onNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, onDelete}) => {
  return (
    <div>
      { persons.map(person => <Person key={person.id} person={person} onDelete={() => onDelete(person.id)} />) }
    </div>
  )
}

const Person = ({person, onDelete}) => {
  return <div>
    {person.name} {person.number}
    <button onClick={onDelete}>delete</button>
  </div>
}

const Notification = ({message, errorMessage}) => {
  if (message === null && errorMessage == null) {
    return null
  }
  if (message !== null) {
    return <div className='message'>{message}</div>
  }
  return <div className='error'>{errorMessage}</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(data => {
      console.log(data)
      setPersons(data)
    })
  }, [])

  const getShowPersons = (persons, filter) => {
    if (filter.length === 0) {
      return persons
    }
    console.log(`filter = ${filter} persons = ${persons}`)
    return persons.filter((person) => person.name.toUpperCase().includes(filter.toUpperCase()))
  }

  const showPersons = getShowPersons(persons, nameFilter)

  const addPerson = (event) => {
    event.preventDefault()
    console.log('on submit.....')
    
    const person = persons.find((person) => person.name === newName)
    if (person != undefined) {
      console.log(newName, "is existed")
      if (!window.confirm(`${newName} is already added to phonebook. Replace the new number with the new once?`)) {
        setNewName('')
        setNewNumber('')
        return
      }
      const updatePerson = {...person, number: newNumber}
      personService.update(updatePerson.id, updatePerson)
        .then(data =>{
          setPersons(persons.map(person => person.id === data.id ? data : person))
          setNewName('')
          setNewNumber('')
          setNotiMessage(`Updated ${data.name}`)
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
        })
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService.create(newPerson).then(data => {
      setPersons(persons.concat(data))
      setNewName('')
      setNewNumber('')
      setNotiMessage(`Added ${data.name}`)
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
    })
  }

  const onNewNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const onNewNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const onNameFilterChange = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value)
  }

  const onDelete = (id) => {
    console.log(`on delete ${id}`)
    const person = persons.find(person => person.id === id)
    if (!window.confirm(`Delete ${person.name}`)) {
      return
    }
    personService
      .remove(id)
      .then(resp => {
        console.log("delete resp", resp)
        setNotiMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setNotiMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setErrorMessage(`${person.name} already has been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage} errorMessage={errorMessage}/>
      <Filter filter={nameFilter} onChange={onNameFilterChange}/>
      <h3>Add New</h3>
      <PersonForm onSubmit={addPerson} 
        name={newName} onNameChange={onNewNameChange}
        number={newNumber} onNumberChange={onNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={showPersons} onDelete={onDelete}/>
    </div>
  )
}

export default App