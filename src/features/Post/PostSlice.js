import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        postId: '123',
        comments: [],
    },
];
const post = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: (state, action) => {
            state.addPhotoVisible = action.payload.addPhotoVisible;
            state.buttonActive = action.payload.buttonActive;
        },
    },
});

const { reducer, actions } = post;
export const { setImageInputState } = actions;
export default reducer;
