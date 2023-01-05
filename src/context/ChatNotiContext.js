import { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { useAuth } from './AuthContext';

export const ChatNotiContext = createContext();

export function useChatNoti() {
    return useContext(ChatNotiContext);
}

function ChatNotiProvider({ children }) {
    const { currentUser } = useAuth();
    const [isHaveChatNoti, setIsHaveChatNoti] = useState(false);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                const arr = Object.entries(doc.data() || {}).map((user) => user[1].receiverHasRead);
                setIsHaveChatNoti(!arr.every((element) => element === true));
            });

            return () => {
                unsub();
            };
        };

        currentUser && getChats();
    }, [currentUser]);

    const value = { isHaveChatNoti };

    return <ChatNotiContext.Provider value={value}>{children}</ChatNotiContext.Provider>;
}

export default ChatNotiProvider;
