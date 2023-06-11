import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://647dc69eaf984710854a4eb9.mockapi.io/contacts/' }),
    tagTypes: ['Contacts'],
    endpoints: builder => ({
        fetchContacts: builder.query({
            query: () => `/contacts`,
            providesTags: ['Contacts'],
        }),
        deleteContact: builder.mutation({
            query: contactId => ({
                url: `/contacts/${contactId}`,
                method: 'DELETE',
            }),
        invalidatesTags:['Contacts'],
        }),
        createContact: builder.mutation({
            query: newContact => ({
                url: '/contacts',
                method: 'POST',
                body: newContact,
            }),
        invalidatesTags:['Contacts'],
        })
    })
})


export const {
    useFetchContactsQuery,
    useDeleteContactMutation,
    useCreateContactMutation,
} = contactsApi;