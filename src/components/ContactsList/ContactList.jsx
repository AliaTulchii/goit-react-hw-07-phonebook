import React from 'react';
import PropTypes from 'prop-types'
import ContactListItem from './ContactListItem';
// import getContact from 'features/contact/getContact';
import { getContact, getContactStatus, getContactError, fetchContacts } from 'features/contact/contactSlice';
import { useSelector, useDispatch } from 'react-redux';
import getFilter from 'features/filter/getFilter';
import { useEffect } from 'react';

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getContact);
  const contactsStatus = useSelector(getContactStatus);
  const contactsError = useSelector(getContactError);

  useEffect(() => {
    if (contactsStatus === 'idle') {
      dispatch(fetchContacts())
    }
  }, [contactsStatus, dispatch])
  

    const filter = useSelector(getFilter);

    const getFiltered = () => {
        if (!filter) {
            return contacts;
          }
          const normalizedFilter = filter.toLowerCase();
          const filteredContacts = contacts.filter(
            ({ name, number }) =>
              name.toLowerCase().trim().includes(normalizedFilter) ||
              number.trim().includes(normalizedFilter)
          );
        
          if (normalizedFilter && !filteredContacts.length) {
            alert(`No contacts matching your request`);
          }
          return filteredContacts;
    }
        
        
    
    const filtered = getFiltered();
    

    if (contacts.length === 0) return null

  let content;
  if (contactsStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (contactsStatus === 'succeeded'){
    filtered.map((contact) => (
      <ContactListItem
        key={contact.id}
        contact={contact}
    />))
  } else if (contactsStatus === 'failed') {
    content = <p>{contactsError}</p>
  }
  
    return (
        <ul>
            {content}
        </ul>
    )
}

export default ContactList;


ContactList.propTypes = {
    contacts: PropTypes.string,
    onDelete: PropTypes.func,
}