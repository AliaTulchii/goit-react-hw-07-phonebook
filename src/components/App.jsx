// import { useEffect, useState} from 'react';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import css from './App.module.css'
import ContactList from './ContactsList/ContactList';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from 'features/contact/contactsSlice';



const App = () => {
  const { data } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  


    return (
    <div className={css.ContactsList}>
        <h1 className={css.ContactList__titleWhite}>Phonebook</h1>
        <div className={css.ContactList__style}>
          <Form contacts={data} />

        <h2 className={css.ContactList__titleBlue}>Contacts</h2>
          <Filter contacts={data}/>
          {data && <ContactList contacts={data} onDelete={deleteContact}/>}
        
        </div>
        
    </div>
  )
  }


export default App;







