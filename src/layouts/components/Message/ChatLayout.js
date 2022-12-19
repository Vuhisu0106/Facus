import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import moment from 'moment';

import { db } from '~/firebase/config';
import Input from '~/components/Input';
import styles from './Chat.module.scss';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '~/context/AuthContext';
import { useSelector } from 'react-redux';
import ImageInputArea from '~/components/Input/ImageInputArea';
import { sendMessageFunction } from '~/utils';
import ChatHeader from './ChatHeader';

const cx = classNames.bind(styles);
function ChatLayout() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const messageRef = useRef();

    const { currentUser } = useAuth();

    const chat = useSelector((state) => state.chat);

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', chat.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        setText('');

        return () => {
            unSub();
        };
    }, [chat.chatId]);

    const handleSend = async () => {
        setText('');
        setImg(null);
        await sendMessageFunction(currentUser, chat, text, img);
    };

    const handleSendInput = (e) => {
        const sendValueInput = e.target.value;

        if (!sendValueInput.startsWith(' ')) {
            setText(sendValueInput);
        } else {
            return;
        }
    };

    return (
        <div className={cx('chat-wrapper')}>
            <ChatHeader uid={chat.user.uid} />

            <div className={cx('chat-box')}>
                <div className={cx('message-list')}>
                    {messages.map((mess) =>
                        mess.senderId === currentUser.uid ? (
                            <div className={cx('message', 'my-mess')} key={mess.id} ref={messageRef}>
                                <span className={cx('sending-time')}>
                                    {/* {moment(mess.date.toDate()).startOf('day').fromNow()} */}
                                    {moment(mess.date.toDate()).diff(moment(moment().format('L'))) < 0
                                        ? moment(mess.date.toDate()).calendar()
                                        : moment(mess.date.toDate()).format('LT')}
                                </span>

                                <div className={cx('my-mess-content-wrapper')}>
                                    {mess.text && <div className={cx('my-mess-content')}>{mess.text}</div>}
                                    {mess.img && <img src={mess.img} alt="" />}
                                </div>
                            </div>
                        ) : (
                            <div className={cx('message', 'fr-mess')} key={mess.id} ref={messageRef}>
                                <div className={cx('fr-mess-content-wrapper')}>
                                    {mess.text && <div className={cx('fr-mess-content')}>{mess.text}</div>}
                                    {mess.img && <img src={mess.img} alt="" />}
                                </div>
                                <span className={cx('sending-time')}>
                                    {moment(mess.date.toDate()).diff(moment(moment().format('L'))) < 0
                                        ? moment(mess.date.toDate()).calendar()
                                        : moment(mess.date.toDate()).format('LT')}
                                </span>
                            </div>
                        ),
                    )}
                </div>
            </div>
            <div className={cx('chat-footer')}>
                {img && (
                    <ImageInputArea
                        className={cx('image-input-area')}
                        src={URL.createObjectURL(img)}
                        onClickCancel={() => {
                            setImg(null);
                        }}
                    />
                )}
                <Input
                    className={cx('mess-input')}
                    value={text}
                    type="text"
                    placeHolder={'Write a message'}
                    onChange={handleSendInput}
                    classNameLeftBtn={cx('img-btn')}
                    leftIcon={<FontAwesomeIcon icon={faImage} />}
                    leftBtnTypeFile
                    onChangeLeftBtn={(e) => {
                        setImg(e.target.files[0]);
                    }}
                    classNameRightBtn={cx('send-btn')}
                    rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                    onClickRightBtn={handleSend}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default ChatLayout;
