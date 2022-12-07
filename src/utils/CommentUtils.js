import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '~/firebase/config';
import { deleteDocument, updateDocument } from '~/firebase/services';
import deleteFileStorage from './common/deleteFileStorage';

export const editCommentFunction = async ({ commentId, comment, commentImg, isImgChanged, isImgDeleted }) => {
    if (commentImg) {
        if (isImgChanged) {
            await deleteFileStorage(commentId);
        }
        const storageRef = ref(storage, commentId);

        await uploadBytesResumable(storageRef, commentImg).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDocument('comment', commentId, {
                    content: comment,
                    img: downloadURL,
                });
            });
        });
    } else if (!comment && !commentImg) {
        return;
    } else if (isImgDeleted) {
        await deleteFileStorage(commentId);
        await updateDocument('comment', commentId, {
            content: comment,
            img: '',
        });
    } else {
        await updateDocument('comment', commentId, {
            content: comment,
        });
    }
};

export const deleteCommentFunction = async (data) => {
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
    await deleteDocument('comment', data.commentId);
};
