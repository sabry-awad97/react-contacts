import './css/App.css';

import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import * as ContactsAPI from './api/ContactsAPI';
import CreateContact from './components/CreateContact.js';
import ListContacts from './components/ListContacts';
import { Contact } from './typings';

const App = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactsAPI.getAll();
      setContacts(res);
    };

    getContacts();
  }, []);

  const removeContact = (contact: Contact) => {
    ContactsAPI.remove(contact);

    setContacts(contacts.filter(c => c.id !== contact.id));
  };

  const createContact = (contact: Contact) => {
    const create = async () => {
      const res = await ContactsAPI.create(contact);
      setContacts(contacts.concat(res));
    };

    create();
    navigate('/');
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ListContacts contacts={contacts} onDeleteContact={removeContact} />
        }
      />
      <Route
        path="/create"
        element={
          <CreateContact
            onCreateContact={contact => {
              createContact(contact);
            }}
          />
        }
      />
    </Routes>
  );
};

export default App;
