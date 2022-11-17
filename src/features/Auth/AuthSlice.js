import { createSlice } from '@reduxjs/toolkit';
import { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { useAuth } from './AuthContext';

const { currentUser } = useAuth();
const [currentUserInfo, setCurrentUserInfo] = useState({});

const initialState = {
    displayName: null,
    photoURL: null,
    uid: null,
    email: null,
};

useEffect(() => {
    const getCurrentUser = () => {
        console.log('call api: ' + currentUser.displayName);
        const unsub = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
            doc.exists() && setCurrentUserInfo(doc.data());
        });
        return () => {
            unsub();
        };
    };

    currentUser?.uid && getCurrentUser();
}, [currentUser]);

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
        },
        setLogOut: (state, action) => {
            state.displayName = null;
            state.photoURL = null;
            state.uid = null;
            state.email = null;
        },
    },
});

const { reducer, actions } = auth;
export const { setLogIn, setLogOut } = actions;
export default reducer;
