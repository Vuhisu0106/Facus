import { doc, getDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { setDocument, updateDocument } from '~/firebase/services';

export const handleSelectChat = async (currentUser, otherUser) => {
    const combinedId =
        currentUser.uid > otherUser.uid ? currentUser.uid + otherUser.uid : otherUser.uid + currentUser.uid;

    try {
        const res = await getDoc(doc(db, 'chats', combinedId));
        if (!res.exists()) {
            //create a chat in chats collection (if chat hasn't existed before)
            await setDocument('chats', combinedId, { messages: [] });

            //create user chats
            await updateDocument('userChats', currentUser.uid, {
                [combinedId + '.userChatId']: combinedId,
                [combinedId + '.userInfo']: {
                    uid: otherUser.uid,
                    displayName: otherUser.displayName,
                    photoURL: otherUser.photoURL,
                },
                [combinedId + '.date']: serverTimestamp(),
                [combinedId + '.receiverHasRead']: true,
            });

            await updateDocument('userChats', otherUser.uid, {
                [combinedId + '.userChatId']: combinedId,
                [combinedId + '.userInfo']: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
                [combinedId + '.date']: serverTimestamp(),
                [combinedId + '.receiverHasRead']: true,
            });
        }
    } catch (error) {}
};
