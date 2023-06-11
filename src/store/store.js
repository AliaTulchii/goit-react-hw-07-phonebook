import { configureStore } from "@reduxjs/toolkit";
// import contactSlice from "features/contact/contactSlice";
import filterSlice from "features/filter/filterSlice";
import { contactsApi } from "features/contact/contactsSlice";



export const store = configureStore({
    reducer: {
    // contact: contactSlice,
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterSlice,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ]
   
});



