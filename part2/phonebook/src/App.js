import { useState } from 'react';

const Contacts = ({ contacts }) => {
  return (
    <table>
      <tbody>
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </tbody>
    </table>
  );
};

const Contact = ({ contact }) => {
  const { name, number } = contact;
  return (
    <tr key={name}>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  );
};

const Filter = ({ value, handler }) => {
  return (
    <div>
      Filter Contacts:
      <input value={value} onChange={handler} />
    </div>
  );
};

const Form = ({ onSubmit, name, number, nameHandler, phoneHandler }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <p>
          name:
          <input value={name} onChange={nameHandler} />
        </p>
        <p>
          number:
          <input value={number} onChange={phoneHandler} />
        </p>
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [query, setQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState(persons);

  const handleQuery = (event) => {
    const text = event.target.value;
    setQuery(text); // handles the text
    setFilter(persons.filter((person) => person.name.includes(text))); // handles the filter
  };

  const handleContactChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newPhone,
    };
    
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      const message = `${newName} already added to phonebook`;
      console.log(message);

      alert(message);
      return;
    }

    const copy = [...persons, personObject];
    setNewName('');
    setNewPhone('');
    setPersons(copy);
    setFilter(copy);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} handler={handleQuery} />
      <h2>Add New</h2>
      <Form
        onSubmit={addContact}
        name={newName}
        number={newPhone}
        nameHandler={handleContactChange}
        phoneHandler={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Contacts contacts={filter} />
    </div>
  );
};

export default App;
