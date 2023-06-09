import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const POSTS_URL = 'https://647dc69eaf984710854a4eb9.mockapi.io/contacts/contacts';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async () => {
        try {
            const response = await axios.get(POSTS_URL);
            return [response.data];
        } catch (err) {
            return err.message;
        }
    }  
)

const initialState = {
    items: [],
    status: 'idle',
    isLoading: false,
    error: null 
}

export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state.contacts.items.push(action.payload)
        },
        removeContact: (state, action) => {
            state.contacts = state.contacts.items.filter((contact) => contact.id !== action.payload)
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state, action) => {
            state.status = 'loading'
        }).addCase(fetchContacts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.contacts = action.payload;
        }).addCase(fetchContacts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
    
})


export const getContact = state => state.contacts;
export const getContactStatus = state => state.status;
export const getContactError = state => state.error;


export const { addContact, removeContact} = contactSlice.actions
export default contactSlice.reducer