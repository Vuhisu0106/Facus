import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import moment from 'moment';

import { db } from '~/firebase/config';
import CircleButton from '~/components/Button/CircleButton';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import MessageItem from '~/components/MessageItem';
import ChatSearch from '~/components/Search/ChatSearch';
import styles from './Chat.module.scss';
import { useAuth } from '~/context/AuthContext';

import { updateDocument } from '~/firebase/services';
import { useDispatch, useSelector } from 'react-redux';
import { setAddChatState } from '~/features/Chat/ChatSlice';
import { LoadingChatItem } from '~/components/Loading';
import { selectChatFunction } from '~/utils';

const cx = classNames.bind(styles);
function ChatSidebar() {
    const [chats, setChats] = useState([]);
    const [activeMessItem, setActiveMessItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();

    const chat = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
                setChats(Object.entries(doc.data()));
                setLoading(false);
            });
            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = async (user) => {
        await selectChatFunction(currentUser, user.userInfo);

        // dispatch(
        //     changeChatUser({
        //         currentUser,
        //         selectUser: user.userInfo,
        //     }),
        // );

        if (user.receiverHasRead === false) {
            await updateDocument('userChats', currentUser.uid, {
                [user.userChatId + '.receiverHasRead']: true,
            });
        } else {
            return;
        }
    };

    useEffect(() => {
        setActiveMessItem(chat.user.uid);
        dispatch(setAddChatState({ isAddChatVisible: false }));
    }, [chat.user.uid]);

    return (
        <div className={cx('sidebar-wrapper')}>
            <div className={cx('sidebar-header')}>
                <div className={cx('sidebar-top-header')}>
                    <h2>Chat</h2>
                    <CircleButton
                        children={<FontAwesomeIcon icon={faSquarePlus} />}
                        onClick={() => dispatch(setAddChatState({ isAddChatVisible: true }))}
                    />
                </div>
                <div className={cx('search')}>
                    <ChatSearch placeHolder={'Search...'} placement={'bottom'} />
                </div>
            </div>
            <div className={cx('user-message-list')}>
                {loading ? (
                    <div className={cx('user-message-loading')}>
                        {Array(11)
                            .fill(0)
                            .map((item, index) => (
                                <LoadingChatItem key={index} />
                            ))}
                    </div>
                ) : (
                    chats
                        ?.sort((a, b) => b[1].date - a[1].date)
                        .map((chat) => (
                            <MessageItem
                                key={chat[0]}
                                active={activeMessItem === chat[1].userInfo.uid && true}
                                userUid={chat[1].userInfo.uid}
                                closestMess={
                                    !chat[1].lastMessage
                                        ? ''
                                        : (chat[1].lastMessage?.senderId === currentUser.uid ? 'You: ' : '') +
                                          chat[1].lastMessage?.text
                                }
                                unread={chat[1].receiverHasRead === false && true}
                                noMessages={!chat[1].lastMessage && true}
                                lastMessageIsImage={chat[1].lastMessage && !chat[1].lastMessage?.text && true}
                                closestMessTime={chat[1].date && moment(chat[1].date.toDate()).fromNow()}
                                onClick={() => {
                                    handleSelect(chat[1]);
                                }}
                            />
                        ))
                )}
            </div>
        </div>
    );
}

export default ChatSidebar;
