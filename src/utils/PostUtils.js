import { arrayRemove, arrayUnion, deleteField } from 'firebase/firestore';
import { deleteDocument, updateDocument } from '~/firebase/services';

export const handleLikePost = async (currentUserUid, likeData, postId, posterId) => {
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

export const handleDeletePost = async (postId, posterId) => {
    if (window.confirm('Do you want delete this post?')) {
        try {
            await deleteDocument('post', postId);
            await updateDocument('userPost', posterId, {
                [postId]: deleteField(),
            });

            //setPostList((cmtList) => cmtList.filter((x) => x.postId !== postId));
        } catch (error) {
            console.log('Sorry, deleting post is getting error: ' + error);
        }
    }
};
