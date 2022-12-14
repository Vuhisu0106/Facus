import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '~/features/Modal/ModalSlice';
import chatReducer from '~/features/Chat/ChatSlice';
import profileReducer from '~/features/Profile/ProfileSlice';
import postNcommentReducer from '~/features/PostAndComment/PostAndCommentSlice';
import themeReducer from '~/features/Theme/ThemeSlice';

const rootReducer = {
    modal: modalReducer,
    chat: chatReducer,
    profile: profileReducer,
    postNcomment: postNcommentReducer,
    theme: themeReducer,
};

const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
