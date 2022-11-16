import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: {
        icon: null,
        text: '',
    },
    bio: '',
    photoURL: null,
    coverPhotoURL: null,
};
const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileInfo: (state, action) => {
            state.status.icon = action.payload.status.icon;
            state.status.text = action.payload.status.text;
            state.bio = action.payload.bio;
            state.photoURL = action.payload.photoURL;
            state.coverPhotoURL = action.payload.coverPhotoURL;
        },
        setStatus: (state, action) => {
            state.status.icon = action.payload.status.icon;
            state.status.text = action.payload.status.text;
        },
        setBio: (state, action) => {
            state.bio = action.payload.bio;
        },
        setPhotoURL: (state, action) => {
            state.photoURL = action.payload.photoURL;
        },
        setCoverPhotoURL: (state, action) => {
            state.coverPhotoURL = action.payload.coverPhotoURL;
        },
        setPhotoAndCoverPhoto: (state, action) => {
            state.photoURL = action.payload.photoURL;
            state.coverPhotoURL = action.payload.coverPhotoURL;
        },
    },
});

const { reducer, actions } = profile;
export const { setProfileInfo, setStatus, setBio, setPhotoURL, setCoverPhotoURL, setPhotoAndCoverPhoto } = actions;
export default reducer;
