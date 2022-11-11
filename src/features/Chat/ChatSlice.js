import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAddChatVisible: false,
    chatId: 'null',
    user: {},
};

const chat = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        changeChatUser: (state, action) => {
            state.user = action.payload.selectUser;
            state.chatId =
                action.payload.currentUser.uid > action.payload.selectUser.uid
                    ? action.payload.currentUser.uid + action.payload.selectUser.uid
                    : action.payload.selectUser.uid + action.payload.currentUser.uid;
        },
        setAddChatState: (state, action) => {
            state.isAddChatVisible = action.payload.isAddChatVisible;
        },
    },
});

const { reducer, actions } = chat;
export const { changeChatUser, setAddChatState } = actions;
export default reducer;
