import { arrayUnion, doc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import store from '~/app/store';
import { changeChatUser } from '~/features/Chat/ChatSlice';
import { v4 as uuid } from 'uuid';

import { db, storage } from '~/firebase/config';
import { setDocument, updateDocument } from '~/firebase/services';
import resizeFiles from './common/resizeFiles';

export const selectChatFunction = async (currentUser, otherUser) => {
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
                },
                [combinedId + '.date']: serverTimestamp(),
                [combinedId + '.receiverHasRead']: true,
            });

            await updateDocument('userChats', otherUser.uid, {
                [combinedId + '.userChatId']: combinedId,
                [combinedId + '.userInfo']: {
                    uid: currentUser.uid,
                },
                [combinedId + '.date']: serverTimestamp(),
                [combinedId + '.receiverHasRead']: true,
            });
        }
        store.dispatch(
            changeChatUser({
                currentUser: currentUser,
                selectUser: otherUser,
            }),
        );
    } catch (error) {}
};

export const sendMessageFunction = async (currentUser, chat, text, img) => {
    const { resizeFile } = resizeFiles();

    if (img) {
        const date = new Date().getTime();
        const storageRef = ref(storage, `${'chat' + currentUser.uid + date}`);
        const uri = await resizeFile(img);

        await uploadString(storageRef, uri, 'data_url').then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDocument('chats', chat.chatId, {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                    }),
                });
            });
        });
    } else if (!text && !img) {
        return;
    } else {
        await updateDocument('chats', chat.chatId, {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            }),
        });
    }

    await updateDocument('userChats', currentUser.uid, {
        [chat.chatId + '.lastMessage']: {
            senderId: currentUser.uid,
            text,
        },

        [chat.chatId + '.date']: serverTimestamp(),
        [chat.chatId + '.receiverHasRead']: true,
    });

    //if current user is same as user messaging to, receiverHasRead will be true
    if (currentUser.uid !== chat.user.uid) {
        await updateDocument('userChats', chat.user.uid, {
            [chat.chatId + '.lastMessage']: {
                senderId: currentUser.uid,
                text,
            },
            [chat.chatId + '.date']: serverTimestamp(),
            [chat.chatId + '.receiverHasRead']: false,
        });
    } else {
        await updateDocument('userChats', chat.user.uid, {
            [chat.chatId + '.lastMessage']: {
                senderId: currentUser.uid,
                text,
            },
            [chat.chatId + '.date']: serverTimestamp(),
            [chat.chatId + '.receiverHasRead']: true,
        });
    }
};
