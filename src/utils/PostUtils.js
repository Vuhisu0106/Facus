import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import store from '~/app/store';
import { addPost, deletePost, editPost, likePost } from '~/features/PostAndComment/PostAndCommentSlice';
import { storage } from '~/firebase/config';
import { deleteDocument, setDocument, updateDocument } from '~/firebase/services';
import deleteFileStorage from './common/deleteFileStorage';

//Handle add post//
export const addPostFunction = async (data, img) => {
    if (img) {
        const storageRef = ref(storage, data.postId);
        await uploadBytesResumable(storageRef, img).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await setDocument('post', data.postId, {
                    ...data,
                    img: downloadURL,
                });
            });
        });
    } else if (!img && !data.caption) {
        return;
    } else {
        await setDocument('post', data.postId, {
            ...data,
            img: '',
        });
    }
    store.dispatch(addPost({ ...data }));
};

//Handle edit post//
export const editPostFunction = async (data) => {
    if (data.img) {
        if (data.isImgChanged) {
            if (!data.isImgAdded) {
                await deleteFileStorage(data.postId);
            }
            const storageRef = ref(storage, data.postId);
            await uploadBytesResumable(storageRef, data.img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDocument('post', data.postId, {
                        caption: data.caption,
                        img: downloadURL,
                    });
                });
            });
        } else {
            await updateDocument('post', data.postId, {
                caption: data.caption,
            });
        }
    } else if (!data.caption && !data.img) {
        return;
    } else if (data.isImgDeleted) {
        await deleteFileStorage(data.postId);

        await updateDocument('post', data.postId, {
            caption: data.caption,
            img: '',
        });
    } else {
        await updateDocument('post', data.postId, {
            caption: data.caption,
        });
    }
    store.dispatch(editPost({ postId: data.postId, caption: data.caption, img: data.img }));
};

//Handle like/unlike post//
export const likePostFunction = async (currentUserUid, likeData, postId) => {
    if (likeData.indexOf(currentUserUid) === -1) {
        await updateDocument('post', postId, {
            like: arrayUnion(currentUserUid),
        });
    } else {
        await updateDocument('post', postId, {
            like: arrayRemove(currentUserUid),
        });
    }
    store.dispatch(likePost({ currentUserUid, like: likeData, postId }));
};

//Handle delete post//
export const deletePostFunction = async (postId) => {
    if (window.confirm('Do you want delete this post?')) {
        try {
            await deleteDocument('post', postId);
            store.dispatch(deletePost({ postId }));
        } catch (error) {
            console.log('Sorry, deleting post is getting error: ' + error);
        }
    }
};
