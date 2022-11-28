import { deleteDocument } from '~/firebase/services';

export const handleDeleteComment = async (commentId) => {
    if (window.confirm('Do you want delete this comment?')) {
        try {
            await deleteDocument('comment', commentId);
            console.log('delete!!!');
            //setCommentList((cmtList) => cmtList.filter((x) => x.commentId !== commentId));
        } catch (error) {
            console.log('Sorry, deleting comment is getting error: ' + error);
        }
    }
};
