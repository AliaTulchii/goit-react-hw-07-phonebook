import React from 'react';
import PropTypes from 'prop-types'
import ContactListItem from './ContactListItem';
import { useSelector } from 'react-redux';
import getFilter from 'features/filter/getFilter';



const ContactList = ({contacts}) => {
  const filter = useSelector(getFilter);

  
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().trim().includes(normalizedFilter) ||
        number.trim().includes(normalizedFilter)
    );
    

    if (contacts.length === 0) return null

    return (
        <ul>
            {filteredContacts.map((contact) => (
            <ContactListItem
              key={contact.id}
                contact={contact}
          />))}
        </ul>
    )
}

export default ContactList;


ContactList.propTypes = {
    contacts: PropTypes.array,
    onDelete: PropTypes.func,
}