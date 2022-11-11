import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const comment = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComment: (state, action) => {
            state = action.payload;
        },
        addCommentWithPhoto: (state, action) => {
            state.push(action.payload);
        },
    },
});

const { reducer, actions } = comment;
export const { setImageInputState } = actions;
export default reducer;
