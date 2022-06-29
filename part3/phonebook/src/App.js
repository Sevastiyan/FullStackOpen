import { useState, useEffect } from 'react';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import Notification from './components/Notification';

import Form from './components/Form';
import service from './services/service';
import './index.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filterText, setFilter] = useState('');
  const [newName, setName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    service.getAll().then((data) => {
      console.log(data);
      setContacts(data);
    });
  }, []);

  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleQuery = (event) => {
    const text = event.target.value;
    setFilter(text); // handles the text
  };

  const handleContactChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhone,
    };

    const names = contacts.map((contact) => contact.name);
    if (names.includes(newName)) {
      const message = `${newName} already added to phonebook \n Do you wish to change?`;
      if (window.confirm(message)) {
        const person = contacts.find((p) => p.name === newName);
        const changedContact = { ...person, number: newPhone };
        service
          .update(changedContact.id, changedContact)
          .then((response) => {
            const newContacts = contacts.map((contact) =>
              contact.id !== changedContact.id ? contact : changedContact
            );
            console.log('🚀 ~ .then ~ newContacts', newContacts);
            setContacts(newContacts);
            notify(
              `Contact: '${response.name}' was updated`,
              'success'
            );
          })
          .catch((error) => {
            notify(
              `Person '${changedContact.name}' was already removed from server`,
              'error'
            );
          });
        return;

      } else {
        return;
      }
    }

    service.create(personObject)
      .then((response) => {
        const newObject = response;
        setName('');
        setPhone('');
        setContacts([...contacts, newObject]);
        notify(`Contact: '${response.name}' was added`, 'success');
      })
      .catch((error) => { 
          const message = error.response.data.error
          console.log('🚀 ~ addContact ~ error', error);
          notify(message, 'error')
      });
  };

  const deleteContact = (id) => {
    console.log('button clicked');
    if (window.confirm('do you want to remove?')) {
      service.remove(id).then((response) => {
        console.log(response);
      });
      const removed = contacts.find((p) => p.id === id);
      notify(`Deleted ${removed.name}`);

      const newArray = contacts.filter((person) => person.id !== id);
      setContacts(newArray);

    } else {
      return;
    }
  };

  const contactsToShow = filterText.length === 0
      ? contacts
      : contacts.filter((p) =>
          p.name.toLowerCase().includes(filterText.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={filterText} handler={handleQuery} />
      <h2>Add New</h2>
      <Form
        onSubmit={addContact}
        name={newName}
        number={newPhone}
        nameHandler={handleContactChange}
        phoneHandler={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Contacts
        contacts={contactsToShow}
        buttonHandler={deleteContact}
      />
    </div>
  );
};

export default App;
