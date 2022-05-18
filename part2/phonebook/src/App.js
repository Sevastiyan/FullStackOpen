import { useState, useEffect } from 'react';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Form from './components/Form';
import service from './services/service';
import './index.css';

const Notification = ({ notification }) => {
  const { message, type } = notification
  if (message === null) {
    return null;
  }

  if (type === 'error') {
    return <div className='error'>{message}</div>;
  } else {
    return <div className='success'>{message}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [queryText, setQuery] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState(persons);
  const [notification, setNotification] = useState({message: null, type: null});
  const defaultNotification = {message: null, type: null}

  useEffect(() => {
    service.getAll().then((data) => {
      console.log(data);
      setPersons(data);
      setFilter(data);
    });
  }, []);

  const handleQuery = (event) => {
    const text = event.target.value;
    setQuery(text); // handles the text
    const copy = [...persons];
    setFilter(
      copy.filter((person) =>
        person.name.toLowerCase().includes(text)
      )
    );
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
      name: newName,
      number: newPhone,
    };

    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      const message = `${newName} already added to phonebook \n Do you wish to change?`;
      if (window.confirm(message)) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newPhone };
        service
          .update(changedPerson.id, changedPerson)
          .then((response) => {
            const newPersons = persons.map((person) =>
              person.id !== changedPerson.id ? person : response
            );
            setPersons(newPersons);
            setFilter(newPersons);

            setNotification({
              message: `Contact: '${response.name}' was updated`,
              type: 'success',
            });
            setTimeout(() => {
              setNotification(defaultNotification);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Person '${changedPerson.name}' was already removed from server`,
              type: 'error',
            });
            setTimeout(() => {
              setNotification(defaultNotification);
            }, 5000);
          });
        return;
      } else {
        return;
      }
    }

    service.create(personObject).then((response) => {
      const newObject = response;
      const copy = [...persons, newObject];
      setNewName('');
      setNewPhone('');
      setPersons(copy);
      setFilter(copy);
      setNotification({
        message: `Contact: '${response.name}' was added`,
        type: 'success',
      });
      setTimeout(() => {
        setNotification(defaultNotification);
      }, 5000);
    });
  };

  const deleteContact = (id) => {
    console.log('button clicked');
    if (window.confirm('do you want to remove?')) {
      service.remove(id).then((response) => {
        console.log(response);
      });
      const newArray = persons.filter((person) => person.id !== id);
      setPersons(newArray);
      setFilter(newArray);
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={queryText} handler={handleQuery} />
      <h2>Add New</h2>
      <Form
        onSubmit={addContact}
        name={newName}
        number={newPhone}
        nameHandler={handleContactChange}
        phoneHandler={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Contacts contacts={filter} buttonHandler={deleteContact} />
    </div>
  );
};

export default App;
