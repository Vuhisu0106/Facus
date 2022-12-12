const { arrayUnion, arrayRemove } = require('firebase/firestore');
const { updateDocument } = require('~/firebase/services');

export const follow = async (currentUserUid, otherUserUid) => {
    await updateDocument('users', currentUserUid, {
        following: arrayUnion(otherUserUid),
    });

    await updateDocument('users', otherUserUid, {
        follower: arrayUnion(currentUserUid),
    });
};

export const unfollow = async (currentUserUid, otherUserUid) => {
    await updateDocument('users', currentUserUid, {
        following: arrayRemove(otherUserUid),
    });

    await updateDocument('users', otherUserUid, {
        follower: arrayRemove(currentUserUid),
    });
};
