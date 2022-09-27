import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase';
import CircleButton from '~/components/Button/CircleButton';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import MessageItem from '~/components/MessageItem';
import ChatSearch from '~/components/Search/ChatSearch';
import styles from './Message.module.scss';
import { useAuth } from '~/context/AuthContext';
import { useChat } from '~/context/ChatContext';

const cx = classNames.bind(styles);
function ChatSidebar() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useAuth();
    const { dispatch } = useChat();

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({ type: 'CHANGE_USER', payload: user });
    };

    return (
        <div className={cx('sidebar-wrapper')}>
            <div className={cx('sidebar-header')}>
                <div className={cx('sidebar-top-header')}>
                    <h2>Chat</h2>
                    <CircleButton children={<FontAwesomeIcon icon={faSquarePlus} />} />
                </div>
                <div className={cx('search')}>
                    <ChatSearch />
                </div>
            </div>
            <div className={cx('user-message-list')}>
                {Object.entries(chats).map((chat) => (
                    <MessageItem
                        key={chat[0]}
                        userName={chat[1].userInfo.displayName}
                        userAvt={chat[1].userInfo.photoURL}
                        closestMess={chat[1].lastMessage?.text}
                        unreadMessCount={1}
                        closestMessTime={'9:00 AM'}
                        onClick={() => handleSelect(chat[1].userInfo)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatSidebar;
