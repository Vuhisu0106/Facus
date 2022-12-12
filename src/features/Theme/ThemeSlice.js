import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
};

const theme = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.darkMode = !state.darkMode;
        },
    },
});

const { reducer, actions } = theme;
export const { toggleTheme } = actions;
export default reducer;
