import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

import { db, storage } from '~/firebase/firebase';
import Input from '~/components/Input';
import styles from './Message.module.scss';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useChat } from '~/context/ChatContext';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '~/context/AuthContext';
import { useApp } from '~/context/AppContext';
import { updateDocument } from '~/firebase/services';

const cx = classNames.bind(styles);
function Chat() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const messageRef = useRef();

    const { checkDark } = useApp();
    const { currentUser } = useAuth();
    const { data } = useChat();

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
            //console.log(data);
        });

        setText('');

        return () => {
            unSub();
        };
    }, [data.chatId]);

    const handleSend = async () => {
        if (img) {
            // const storageRef = ref(storage, uuid());
            // const uploadTask = uploadBytesResumable(storageRef, img);
            // uploadTask.on(
            //     (error) => {
            //         //TODO:Handle Error
            //     },
            //     () => {
            //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //             await updateDocument( 'chats', data.chatId), {
            //                 messages: arrayUnion({
            //                     id: uuid(),
            //                     text,
            //                     senderId: currentUser.uid,
            //                     date: Timestamp.now(),
            //                     img: downloadURL,
            //                 }),
            //             });
            //         });
            //     },
            // );
        } else if (!text) {
            return;
        } else {
            await updateDocument('chats', data.chatId, {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDocument('userChats', currentUser.uid, {
            [data.chatId + '.lastMessage']: {
                senderId: currentUser.uid,
                text,
            },

            [data.chatId + '.date']: serverTimestamp(),
            [data.chatId + '.receiverHasRead']: true,
        });

        //if current user is same as user messaging to, receiverHasRead will be true
        if (currentUser.uid !== data.user.uid) {
            await updateDocument('userChats', data.user.uid, {
                [data.chatId + '.lastMessage']: {
                    senderId: currentUser.uid,
                    text,
                },
                [data.chatId + '.date']: serverTimestamp(),
                [data.chatId + '.receiverHasRead']: false,
            });
        } else {
            await updateDocument('userChats', data.user.uid, {
                [data.chatId + '.lastMessage']: {
                    senderId: currentUser.uid,
                    text,
                },
                [data.chatId + '.date']: serverTimestamp(),
                [data.chatId + '.receiverHasRead']: true,
            });
        }

        setText('');
        setImg(null);
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
        <div className={cx('chat-wrapper', checkDark('dark-chat'))}>
            <div className={cx('chat-header')}>
                <img className={cx('user-avt')} alt={data.user?.displayName} src={data.user?.photoURL} />
                <h3 className={cx('user-name')}>{data.user?.displayName}</h3>
            </div>
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
                                    <div className={cx('my-mess-content')}>{mess.text}</div>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('message', 'fr-mess')} key={mess.id} ref={messageRef}>
                                <div className={cx('fr-mess-content-wrapper')}>
                                    <div className={cx('fr-mess-content')}>{mess.text}</div>
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
                <Input
                    className={cx('mess-input')}
                    value={text}
                    type="text"
                    placeHolder={'Write a message'}
                    onChange={handleSendInput}
                    classNameLeftBtn={cx('img-btn')}
                    leftIcon={<FontAwesomeIcon icon={faImage} />}
                    classNameRightBtn={cx('send-btn')}
                    rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                    onClickRightBtn={handleSend}
                />
            </div>
        </div>
    );
}

export default Chat;
