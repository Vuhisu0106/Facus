import { arrayRemove, arrayUnion, deleteField, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase/config';
import { deleteDocument, setDocument, updateDocument } from '~/firebase/services';
import { v4 as uuid } from 'uuid';
import deleteFileStorage from './common/deleteFileStorage';

export const addPost = async (currentUser, caption, img) => {
    let uuId = uuid();
    if (img) {
        const storageRef = ref(storage, uuId);

        await uploadBytesResumable(storageRef, img).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDocument('userPost', currentUser.uid, {
                    [uuId]: {
                        postId: uuId,
                        poster: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                        },
                        caption: caption,
                        img: downloadURL,
                        date: serverTimestamp(),
                        like: [],
                        comment: [],
                    },
                });

                await setDocument('post', uuId, {
                    postId: uuId,
                    poster: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    caption: caption,
                    img: downloadURL,
                    date: serverTimestamp(),
                    like: [],
                    comment: [],
                });
            });
        });
    } else if (!img && !caption) {
        return;
    } else {
        await updateDocument('userPost', currentUser.uid, {
            [uuId]: {
                postId: uuId,
                poster: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
                caption: caption,
                date: serverTimestamp(),
                like: [],
                comment: [],
            },
        });
        await setDocument('post', uuId, {
            postId: uuId,
            poster: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
            },
            caption: caption,

            date: serverTimestamp(),
            like: [],
            comment: [],
        });
    }
};

export const editPost = async (data) => {
    if (data.img) {
        if (data.isImgChanged) {
            await deleteFileStorage(data.postId);
        }
        const storageRef = ref(storage, data.postId);

        //const uploadTask = await uploadBytesResumable(storageRef, img);
        await uploadBytesResumable(storageRef, data.img).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDocument('userPost', data.currentUser.uid, {
                    [data.postId + '.caption']: data.caption,
                    [data.postId + '.img']: downloadURL,
                });

                await updateDocument('post', data.postId, {
                    caption: data.caption,
                    img: downloadURL,
                });
            });
        });
    } else if (!data.caption && !data.img) {
        return;
    } else if (data.isImgDeleted) {
        await deleteFileStorage(data.postId);
        await updateDocument('userPost', data.currentUser.uid, {
            [data.postId + '.caption']: data.caption,
            [data.postId + '.img']: '',
        });
        await updateDocument('post', data.postId, {
            caption: data.caption,
            img: '',
        });
    } else {
        await updateDocument('userPost', data.currentUser.uid, {
            [data.postId + '.caption']: data.caption,
        });
        await updateDocument('post', data.postId, {
            caption: data.caption,
        });
    }
};

export const likePost = async (currentUserUid, likeData, postId, posterId) => {
    if (likeData.indexOf(currentUserUid) === -1) {
        await updateDocument('post', postId, {
            like: arrayUnion(currentUserUid),
        });

        await updateDocument('userPost', posterId, {
            [postId + '.like']: arrayUnion(currentUserUid),
        });
    } else {
        await updateDocument('post', postId, {
            like: arrayRemove(currentUserUid),
        });
        await updateDocument('userPost', posterId, {
            [postId + '.like']: arrayRemove(currentUserUid),
        });
    }
};

export const deletePost = async (postId, posterId) => {
    if (window.confirm('Do you want delete this post?')) {
        try {
            await deleteDocument('post', postId);
            await updateDocument('userPost', posterId, {
                [postId]: deleteField(),
            });
        } catch (error) {
            console.log('Sorry, deleting post is getting error: ' + error);
        }
    }
};
