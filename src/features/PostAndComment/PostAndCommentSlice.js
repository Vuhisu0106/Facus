import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postLoading: true,
    posts: [],
};
const postNcomment = createSlice({
    name: 'postNcomment',
    initialState,
    reducers: {
        resetPost: (state, action) => {
            state = initialState;
            return state;
        },
        setPost: (state, action) => {
            state = { ...state, posts: action.payload };
            return state;
        },
        // addPost: (state, action) => {
        //     state = { ...state, posts: [...state.posts, action.payload] };
        //     return state;
        // },
        // updatePost: (state, action) => {
        //     const postId = action.payload.postId;
        //     const postIndex = state.posts.findIndex((post) => post.postId === postId);
        //     const updatePost = state.posts[postIndex];
        //     if (postIndex !== -1) {
        //         state.posts[postIndex] = { ...updatePost, img: action.payload.img, caption: action.payload.caption };
        //     }
        // },
        // deletePost: (state, action) => {
        //     const filterPosts = state.posts.filter((post) => post.postId !== action.payload);
        //     state = { ...state, posts: filterPosts };
        //     return state;
        // },
        setComments: (state, action) => {
            const { postId, comments } = action.payload;
            const postIndex = state.posts.findIndex((post) => post.postId === postId);

            if (postIndex !== -1) {
                state.posts[postIndex].comment = [...comments];
            }
        },
        addComment: (state, action) => {
            const { postId, comment } = action.payload;
            const postIndex = state.posts.findIndex((post) => post.postId === postId);

            if (postIndex !== -1) {
                //state.posts[postIndex].comment = [...state.posts[postIndex].comment, comment];
                state.posts[postIndex].comment.push(comment);
            }
        },
        editComment: (state, action) => {
            const { postId, comment } = action.payload;
            const postIndex = state.posts.findIndex((post) => post.postId === postId);

            if (postIndex !== -1) {
                const commentIndex = postIndex.comment.findIndex((cmt) => cmt.commentId === comment.commentId);

                if (commentIndex !== -1) {
                    // state.posts[postIndex].comment = [...state.posts[postIndex].comment, comment];
                    // state.posts[postIndex].comment.push(comment);
                }
            }
        },
        deleteComment: (state, action) => {
            const { postId, filteredComments } = action.payload;
            const postIndex = state.posts.findIndex((post) => post.postId === postId);

            if (postIndex !== -1) {
                state.posts[postIndex].comment = filteredComments;
                //const filterPosts = state.posts.filter((post) => post.postId !== action.payload);

                // const postComments = state.posts[postIndex].comment;
                // state.posts[postIndex].comment = postComments.filter((cmt) => cmt.commentId !== commentId);
            }
        },
    },
});

const { reducer, actions } = postNcomment;
export const { setPost, resetPost, setComments, addComment, deleteComment } = actions;
export default reducer;
