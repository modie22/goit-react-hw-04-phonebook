//import { Component } from 'react';
import shortid from 'shortid';
import Container from './Container/Container';
import ContactForm from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './List/List';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getContactToLocal = () => {
    localStorage.setItem('contactLocal', JSON.stringify(contacts));
  };
  const addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else if (name.trim() === '' || number.trim() === '') {
      alert("Enter the contact's name and number phone!");
    } else if (contact.number.toString().length !== 12) {
      alert(`The number must contain 12 numbers!`);
    } else if (!/^(38)?0[0-9]{9}$/g.test(number)) {
      alert('The phone number must start with 380!');
    } else {
      setContacts(state => {
        return [contact, ...state];
      });
    }
  };

  const deleteContact = contactId => {
    setContacts(state => {
      return contacts.filter(contact => contact.id !== contactId);
    });
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem('contactLocal') !== null) &&
      JSON.parse(localStorage.getItem('contactLocal')).length > 0
    )
      setContacts(JSON.parse(localStorage.getItem('contactLocal')));
  }, []);
  useEffect(() => {
    getContactToLocal();
  }, [contacts, getContactToLocal]);

  const visibleContacts = getVisibleContacts();
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      {contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}
      {contacts.length > 0 ? (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>Your phonebook is empty. Please add contact.</p>
      )}
    </Container>
  );
}

export default App;
