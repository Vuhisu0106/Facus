import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import store from '~/app/store';
import { addComment, deleteComment, editComment } from '~/features/PostAndComment/PostAndCommentSlice';
import { storage } from '~/firebase/config';
import { updateDocument } from '~/firebase/services';
import deleteFileStorage from './common/deleteFileStorage';
import resizeFiles from './common/resizeFiles';

export const addCommentFunction = async (postComment, data, commentImg) => {
    const { resizeFile } = resizeFiles();

    if (commentImg) {
        const storageRef = ref(storage, data.commentId);
        const uri = await resizeFile(commentImg);

        await uploadString(storageRef, uri, 'data_url').then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDocument('post', data.postId, {
                    comment: [
                        ...postComment,
                        {
                            ...data,
                            img: downloadURL,
                        },
                    ],
                });
                store.dispatch(addComment({ postId: data.postId, comment: { ...data, img: downloadURL } }));
            });
        });
    } else if (!data.content && !commentImg) {
        return;
    } else {
        await updateDocument('post', data.postId, {
            comment: [
                ...postComment,
                {
                    ...data,
                    img: '',
                },
            ],
        });
        store.dispatch(addComment({ postId: data.postId, comment: { ...data } }));
    }
};

export const editCommentFunction = async (data, updatedComments) => {
    const { resizeFile } = resizeFiles();

    if (data.commentImg) {
        if (data.isImgChanged) {
            if (!data.isImgAdded) {
                await deleteFileStorage(data.commentId);
            }
            const storageRef = ref(storage, data.commentId);
            const uri = await resizeFile(data.commentImg);

            await uploadString(storageRef, uri, 'data_url').then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    const dataComment = updatedComments.map((cmt) => {
                        return cmt.commentId === data.commentId ? { ...cmt, img: downloadURL } : cmt;
                    });
                    await updateDocument('post', data.postId, {
                        comment: [...dataComment],
                    });
                    store.dispatch(editComment({ postId: data.postId, updatedComments: dataComment }));
                });
            });
        } else {
            await updateDocument('post', data.postId, {
                comment: [...updatedComments],
            });
            store.dispatch(editComment({ postId: data.postId, updatedComments }));
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
        store.dispatch(editComment({ postId: data.postId, updatedComments: dataComment }));
    }
};

export const deleteCommentFunction = async (data, filterComments) => {
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
        comment: [...filterComments],
    });

    store.dispatch(deleteComment({ postId: data.postId, filterComments }));
};
