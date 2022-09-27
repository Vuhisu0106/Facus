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

const cx = classNames.bind(styles);
function ChatSidebar() {
    const [chats, setChats] = useState([]);

    const { currentUser } = useAuth();

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
                    />
                ))}
                {/* <h3>Messages</h3> */}
                {/* <MessageItem
                    userName={'Mảk'}
                    userAvt={
                        'https://preview.redd.it/55a9r6ftcpy81.jpg?width=680&format=pjpg&auto=webp&s=579b8893877aaf11c22ed799d89ad6150a8ca2fd'
                    }
                    closestMess={'Lô'}
                    unreadMessCount={1}
                    closestMessTime={'9:00 AM'}
                />
                <MessageItem
                    userName={'Hecker'}
                    userAvt={
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRojQwSjcGEH_FshYrUjlZTwYcwGRwmwECpy7raRjqfIDPWpWGqrJnEbHBSeg8w3o7TGsidebar&usqp=CAU'
                    }
                    closestMess={'Oke vậy đi'}
                    unreadMessCount={2}
                    closestMessTime={'7:00 PM'}
                />
                <MessageItem
                    userName={'ml Elon'}
                    userAvt={
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_eTO1wjqX1fs0KKMpOBgo2jZJoWn2xrfBOA&usqp=CAU'
                    }
                    closestMess={'Ê còn tiền ko cho vay đi'}
                    unreadMessCount={'99'}
                    closestMessTime={'2:00 AM'}
                />
                <MessageItem
                    userName={'Mike'}
                    userAvt={'https://en.meming.world/images/en/b/bc/Mike_Wazowski-Sulley_Face_Swap.jpg'}
                    closestMess={'À oke'}
                    unreadMessCount={1}
                    closestMessTime={'9:00 AM'}
                />
                <MessageItem
                    userName={'Steve Mĩ'}
                    userAvt={'https://avatarfiles.alphacoders.com/132/132319.jpg'}
                    closestMess={'Cái dm'}
                    unreadMessCount={1}
                    closestMessTime={'9:00 AM'}
                /> */}
            </div>
        </div>
    );
}

export default ChatSidebar;
