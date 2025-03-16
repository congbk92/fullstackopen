import { useState } from 'react'

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

const Persons = ({persons}) => {
  return (
    <div>
      { persons.map(person => (<p key={person.name}>{person.name} {person.number}</p>)) }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }  
  ])
  const [showPersons, setShowPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const getShowPersons = (persons, filter) => {
    let ret = persons
    if (filter.length > 0) {
      const upper_filter = filter.toUpperCase()
      ret = persons.filter((person) => person.name.toUpperCase().includes(upper_filter))
    }
    console.log(`filter = ${filter} persons = ${persons}, output = ${ret}`)
    return ret
  }
  const addPerson = (event) => {
    event.preventDefault()
    console.log('on submit.....')

    if (persons.find((person) => person.name === newName) != undefined) {
      console.log(newName, "is existed")
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const newPersons = persons.concat(newPerson)
    setPersons(newPersons)
    setShowPersons(getShowPersons(newPersons, nameFilter))
    setNewName('')
    setNewNumber('')
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
    setShowPersons(getShowPersons(persons, event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} onChange={onNameFilterChange}/>
      <h3>Add New</h3>
      <PersonForm onSubmit={addPerson} 
        name={newName} onNameChange={onNewNameChange}
        number={newNumber} onNumberChange={onNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={showPersons}/>
    </div>
  )
}

export default App