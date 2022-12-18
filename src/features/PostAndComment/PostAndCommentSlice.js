import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    postLoading: true,
    posts: [],
};
const postNcomment = createSlice({
    name: 'postNcomment',
    initialState,
    reducers: {
        ///////////////////////////////////////Post///////////////////////////////////////
        resetPost: (state, action) => {
            state = initialState;
            return state;
        },
        setPost: (state, action) => {
            state = { ...state, posts: action.payload };
            return state;
        },
        addPost: (state, action) => {
            state = { ...state, posts: [...state.posts, action.payload] };
            return state;
        },
        editPost: (state, action) => {
            const { postId, caption, img } = action.payload;
            state = {
                ...state,
                posts: state.posts.map((pst) =>
                    pst.postId === postId ? { ...pst, img: img || '', caption: caption } : pst,
                ),
            };
            return state;
        },
        likePost: (state, action) => {
            const { currentUserUid, like, postId } = action.payload;
            const currentPost = state.posts.find((post) => post.postId === postId);

            if (like.indexOf(currentUserUid) === -1) {
                currentPost.like = [...currentPost.like, currentUserUid];
            } else {
                const likeIndex = currentPost.like.indexOf(currentUserUid);
                if (likeIndex !== -1) {
                    currentPost.like.splice(likeIndex, 1);
                }
            }
        },
        deletePost: (state, action) => {
            const filterPosts = state.posts.filter((post) => post.postId !== action.payload.postId);
            state = { ...state, posts: filterPosts };
            return state;
        },

        /////////////////////////////////////Comment/////////////////////////////////////
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
                state.posts[postIndex].comment.push(comment);
            }
        },
        editComment: (state, action) => {
            const { postId, updatedComments } = action.payload;
            const postIndex = state.posts.findIndex((post) => post.postId === postId);

            if (postIndex !== -1) {
                state.posts[postIndex].comment = updatedComments;
            }
        },
        likeComment: (state, action) => {
            const { currentUserUid, postId, commentId } = action.payload;
            const currentPost = state.posts.find((post) => post.postId === postId);

            if (currentPost) {
                const currentComment = currentPost.comment.find((cmt) => cmt.commentId === commentId);
                currentComment.like = [...currentComment.like, currentUserUid];
            }
        },
        unlikeComment: (state, action) => {
            const { currentUserUid, postId, commentId } = action.payload;
            const currentPost = state.posts.find((post) => post.postId === postId);

            if (currentPost) {
                const currentComment = currentPost.comment.find((cmt) => cmt.commentId === commentId);
                const likeIndex = currentComment.like.indexOf(currentUserUid);
                if (likeIndex !== -1) {
                    currentComment.like.splice(likeIndex, 1);
                }
            }
        },
        deleteComment: (state, action) => {
            const { postId, filteredComments } = action.payload;
            const postIndex = state.posts.findIndex((post) => post.postId === postId);

            if (postIndex !== -1) {
                state.posts[postIndex].comment = filteredComments;
            }
        },
    },
});

const { reducer, actions } = postNcomment;
export const {
    setPost,
    resetPost,
    addPost,
    editPost,
    likePost,
    deletePost,
    setComments,
    addComment,
    editComment,
    likeComment,
    unlikeComment,
    deleteComment,
} = actions;
export default reducer;
