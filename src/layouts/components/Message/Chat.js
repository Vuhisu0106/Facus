import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '~/firebase';
import Input from '~/components/Input';
import styles from './Message.module.scss';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useChat } from '~/context/ChatContext';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
function Chat() {
    const [messages, setMessages] = useState([]);
    const { data } = useChat();
    console.log('data:', data);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <div className={cx('chat-wrapper')}>
            <div className={cx('chat-header')}>
                <img className={cx('user-avt')} alt={data.user?.displayName} src={data.user?.photoURL} />
                <h3 className={cx('user-name')}>{data.user?.displayName}</h3>
            </div>
            <div className={cx('chat-box')}>
                <div className={cx('message-list')}>
                    {/* <div className={cx('message', 'my-mess')}>
                        <div className={cx('my-mess-content')}>Hi bro, đang làm clg đấy? :) </div>

                        <span className={cx('sending-time')}>10:42 AM</span>
                    </div>
                    <div className={cx('message', 'fr-mess')}>
                        <div className={cx('fr-mess-content')}>Hỏi làm gì?</div>
                        <span className={cx('sending-time')}>10:42 AM</span>
                    </div>
                    <div className={cx('message', 'my-mess')}>
                        <div className={cx('my-mess-content')}>Đi cafe ko?</div>
                        <span className={cx('sending-time')}>10:43 AM</span>
                    </div>
                    <div className={cx('message', 'fr-mess')}>
                        <div className={cx('fr-mess-content')}>Bao thì đi</div>
                        <span className={cx('sending-time')}>10:44 AM</span>
                    </div>
 */}
                </div>
            </div>
            <div className={cx('chat-footer')}>
                <Input
                    className={cx('mess-input')}
                    type="text"
                    placeHolder={'Write a message'}
                    classNameLeftBtn={cx('img-btn')}
                    leftIcon={<FontAwesomeIcon icon={faImage} />}
                    classNameRightBtn={cx('send-btn')}
                    rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                />
            </div>
        </div>
    );
}

export default Chat;
