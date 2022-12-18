import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

import { db, storage } from '~/firebase/config';
import Input from '~/components/Input';
import styles from './Message.module.scss';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '~/context/AuthContext';

import { updateDocument } from '~/firebase/services';
import { useSelector } from 'react-redux';
import ImageInputArea from '~/components/Input/ImageInputArea';
import { resizeFiles } from '~/utils';
import ChatHeader from './ChatHeader';

const cx = classNames.bind(styles);
function Chat() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const messageRef = useRef();

    const { currentUser } = useAuth();

    const chat = useSelector((state) => state.chat);

    const { resizeFile } = resizeFiles();

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
        } else if (!text) {
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

export default Chat;
