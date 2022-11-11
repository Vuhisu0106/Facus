import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addPhotoVisible: false,
    buttonActive: false,
};
const modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setImageInputState: (state, action) => {
            state.addPhotoVisible = action.payload.addPhotoVisible;
            state.buttonActive = action.payload.buttonActive;
        },
    },
});

const { reducer, actions } = modal;
export const { setImageInputState } = actions;
export default reducer;
