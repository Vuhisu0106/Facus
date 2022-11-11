//import { configureStore } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '~/features/Modal/ModalSlice';

const rootReducer = { modal: modalReducer };

const store = configureStore({
    reducer: rootReducer,
});

export default store;
