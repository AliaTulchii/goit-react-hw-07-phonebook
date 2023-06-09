import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "features/contact/contactSlice";
import filterSlice from "features/filter/filterSlice";




export const store = configureStore({
    reducer: {
    contact: contactSlice,
    filter: filterSlice,
    },
    
    
});



