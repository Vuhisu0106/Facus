import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase/config';
import { deleteDocument, setDocument, updateDocument } from '~/firebase/services';
import deleteFileStorage from './common/deleteFileStorage';

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
};

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
};

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
};

export const deletePostFunction = async (postId, posterId) => {
    if (window.confirm('Do you want delete this post?')) {
        try {
            await deleteDocument('post', postId);
        } catch (error) {
            console.log('Sorry, deleting post is getting error: ' + error);
        }
    }
};
