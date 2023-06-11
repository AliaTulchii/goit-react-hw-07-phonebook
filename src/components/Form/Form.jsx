import React from 'react';
import css from './Form.module.css';
import { v4 } from 'uuid';
import { useCreateContactMutation, useFetchContactsQuery } from 'features/contact/contactsSlice';






const Form = () => {
    const [nameContact, setNameContact] = React.useState('')
    const [numberContact, setNumberContact] = React.useState('')
    
    const [createContact, { isLoading }] = useCreateContactMutation();
    const { data } = useFetchContactsQuery();
    


    const addContactHandler = e => {
        e.preventDefault();
        
        const isValidate = validateForm();
        if (!isValidate) return;  
        
        
        if (data) {
            data.find(contact => contact.name.toLowerCase().trim() === nameContact.toLowerCase().trim())
                ? alert(`${nameContact} is already in contacts list`)
                : createContact({ name: nameContact, number: numberContact });        
        }
        
    
        
        setNameContact('')
        setNumberContact('')
    }
    
    const validateForm = () => {
        
        if (!nameContact || !numberContact) {
            alert('This field empty!');
            return false;
        }

        return true;
    }
    
    const nameId = v4();
    const numberId = v4();
        
        return (
            <form  className={css.Form}  onSubmit={()=> addContactHandler()}>

                <label  className={css.Form__inputLabel}>
                    <p>Name:</p>
                <input
                id={nameId}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                placeholder="Enter name"
                onChange={e => setNameContact(e.target.value)}
                value={nameContact}
                className={css.Form__input}
                    />
            </label>
                
                <label  className={css.Form__inputLabel}>
                    <p>Number:</p>
                <input
                    id={numberId}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    placeholder="Enter phone number"
                    value={numberContact}
                    onChange={e => setNumberContact(e.target.value)}
                    className={css.Form__input}
                    />
                </label>
                
                <button
                    type="submit"
                    className={css.Form__button}>{isLoading ? <p>Loading...</p> : <p>Add contact</p>}</button>
            </form>
        )
    }







export default Form;