import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displayName: null,
    photoURL: null,
    uid: null,
    email: null,
};

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
