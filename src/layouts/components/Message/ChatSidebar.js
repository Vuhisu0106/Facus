import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';

import { db } from '~/firebase';
import CircleButton from '~/components/Button/CircleButton';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import MessageItem from '~/components/MessageItem';
import ChatSearch from '~/components/Search/ChatSearch';
import styles from './Message.module.scss';
import { useAuth } from '~/context/AuthContext';
import { useChat } from '~/context/ChatContext';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
function ChatSidebar() {
    const [chats, setChats] = useState([]);
    const [activeMessItem, setActiveMessItem] = useState(null);

    const { setIsAddChatVisible } = useApp();
    const { currentUser } = useAuth();
    const { data, dispatch } = useChat();

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

    const handleSelect = async (user) => {
        await dispatch({ type: 'CHANGE_USER', payload: user.userInfo });

        console.log(user);
        if (user.receiverHasRead === false) {
            await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [user.userChatId + '.receiverHasRead']: true,
            });
            console.log('sender is not you');
        } else {
            console.log('sender is you');
        }

        //var selectedMessage = localStorage.getItem('SelectedMessage') || 1;
        //localStorage.setItem('SelectedMessage', user.userInfo.uid);
        //setActiveMessItem(user.userInfo.uid);
    };

    // useEffect(() => {
    //     const unSub = onSnapshot(doc(db, 'userChats', data.chatId), (doc) => {
    //         setMessageItem(doc.data());
    //     });

    //     return () => {
    //         unSub();
    //     };
    // }, [data.chatId]);

    // async function updateUnread(user) {
    //     console.log('ms:' + messageItem);
    //     if (user.receiverHasRead === false) {
    //         await updateDoc(doc(db, 'userChats', currentUser.uid), {
    //             [messageItem.chatId + '.receiverHasRead']: true,
    //         });
    //         console.log('sender is not you');
    //     } else {
    //         console.log('sender is you');
    //     }
    // }

    useEffect(() => {
        setActiveMessItem(data.user.uid);
        setIsAddChatVisible(false);
    }, [data]);

    return (
        <div className={cx('sidebar-wrapper')}>
            <div className={cx('sidebar-header')}>
                <div className={cx('sidebar-top-header')}>
                    <h2>Chat</h2>
                    <CircleButton
                        children={<FontAwesomeIcon icon={faSquarePlus} />}
                        onClick={() => setIsAddChatVisible(true)}
                    />
                </div>
                <div className={cx('search')}>
                    <ChatSearch placeHolder={'Search...'} placement={'bottom'} />
                </div>
            </div>
            <div className={cx('user-message-list')}>
                {Object.entries(chats)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                        // <HeadlessTippy
                        //     key={chat[0]}
                        //     //visible="true"
                        //     delay={[0, 700]}
                        //     interactive
                        //     placement="bottom-end"
                        //     offset={[12, 8]}
                        //     render={(attrs) => <h2>Hello</h2>}
                        // >
                        <MessageItem
                            key={chat[0]}
                            active={activeMessItem === chat[1].userInfo.uid && true}
                            userName={chat[1].userInfo.displayName}
                            userAvt={chat[1].userInfo.photoURL}
                            closestMess={
                                !chat[1].lastMessage
                                    ? ''
                                    : (chat[1].lastMessage?.senderId === currentUser.uid ? 'You: ' : '') +
                                      chat[1].lastMessage?.text
                            }
                            unread={chat[1].receiverHasRead === false && true}
                            closestMessTime={chat[1].date && moment(chat[1].date.toDate()).fromNow()}
                            onClick={() => {
                                handleSelect(chat[1]);
                                console.log(data);
                            }}
                        />
                        // </HeadlessTippy>
                    ))}
            </div>
        </div>
    );
}

export default ChatSidebar;
