import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase/config';
import { updateDocument } from '~/firebase/services';
import deleteFileStorage from './common/deleteFileStorage';

export const editCommentFunction = async (data, updatedComments) => {
    if (data.commentImg) {
        if (data.isImgChanged) {
            if (!data.isImgAdded) {
                await deleteFileStorage(data.commentId);
            }
            const storageRef = ref(storage, data.commentId);
            await uploadBytesResumable(storageRef, data.commentImg).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    const dataComment = updatedComments.map((cmt) => {
                        return cmt.commentId === data.commentId ? { ...cmt, img: downloadURL } : cmt;
                    });
                    await updateDocument('post', data.postId, {
                        comment: [...dataComment],
                    });
                });
            });
        } else {
            await updateDocument('post', data.postId, {
                comment: [...updatedComments],
            });
        }
    } else if (!data.comment && !data.commentImg) {
        return;
    } else {
        if (data.isImgDeleted) {
            await deleteFileStorage(data.commentId);
        }
        const dataComment = updatedComments.map((cmt) => {
            return cmt.commentId === data.commentId ? { ...cmt, img: '' } : cmt;
        });
        await updateDocument('post', data.postId, {
            comment: [...dataComment],
        });
    }
};

export const deleteCommentFunction = async (data, filterComment) => {
    if (data.img) {
        const desertRef = ref(storage, data.commentId);
        await deleteObject(desertRef)
            .then(() => {
                console.log('Deleting image completed');
            })
            .catch((error) => {
                console.log('Error appearing', error);
            });
    }

    await updateDocument('post', data.postId, {
        comment: [...filterComment],
    });
};
