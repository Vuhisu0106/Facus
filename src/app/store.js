import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '~/features/Modal/ModalSlice';
import chatReducer from '~/features/Chat/ChatSlice';

const rootReducer = { modal: modalReducer, chat: chatReducer };

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
