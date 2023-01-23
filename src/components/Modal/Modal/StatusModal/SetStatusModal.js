import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPicker from 'emoji-picker-react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from './StatusModal.module.scss';

import { updateDocument } from '~/firebase/services';
import { useAuth } from '~/context/AuthContext';
import { deleteField } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '~/features/Profile/ProfileSlice';
import { toast } from 'react-toastify';
import { LoadingIcon } from '~/components/Icon';
import Modal from '../..';

const cx = classNames.bind(styles);
function SetStatusModal({ setFromEmpty, onClose }) {
    const { currentUser } = useAuth();

    const status = useSelector((state) => state.profile.status);
    const dark = useSelector((state) => state.theme.darkMode);

    const dispatch = useDispatch();

    const [selectedEmoji, setSelectEmoji] = useState(setFromEmpty ? '' : status.icon || '');
    const [text, setText] = useState(setFromEmpty ? '' : status.text || '');
    const [showPicker, setShowPicker] = useState(false);
    const [statusBtnDisable, setStatusBtnDisable] = useState(true);
    const [loading, setLoading] = useState(false);

    const onEmojiClick = (e) => {
        setShowPicker(false);
        setSelectEmoji(e.emoji);
    };

    const clearStatus = async () => {
        try {
            await updateDocument('users', currentUser.uid, {
                status: deleteField(),
            });
            dispatch(setStatus({ status: { icon: null, text: '' } }));
        } catch (error) {
            toast.error('Fail to clear status');
        }
        setSelectEmoji('');
        setText('');
        setShowPicker(false);
        onClose();
    };

    const handleSendInput = (e) => {
        const sendValueInput = e.target.value;

        if (!sendValueInput.startsWith(' ')) {
            setText(sendValueInput);
        } else {
            setStatusBtnDisable(true);
        }
    };

    //Condition to set 'Set status btn' unactive
    useEffect(() => {
        if (selectedEmoji && text) {
            setStatusBtnDisable(false);
        } else {
            setStatusBtnDisable(true);
        }
    }, [selectedEmoji, text]);

    const handleSetStatus = async () => {
        setLoading(true);
        try {
            await updateDocument('users', currentUser.uid, {
                status: {
                    icon: selectedEmoji,
                    text,
                },
            });
            dispatch(setStatus({ status: { icon: selectedEmoji, text: text } }));
            setLoading(false);
        } catch (error) {
            toast.error('Fail to clear status');
            setLoading(false);
        }
        onClose();
    };

    return (
        <Modal
            title="Edit status"
            l={4}
            l_o={4}
            m={6}
            m_o={3}
            s={10}
            s_o={1}
            onClose={onClose}
            children={
                <div className={cx('set-status__wrapper')}>
                    <div className={cx('status-content')}>
                        <Input
                            value={text}
                            className={cx('status-bar')}
                            inputClassName={cx('status-input')}
                            placeHolder="What's happening?"
                            classNameLeftBtn={cx('status-icon')}
                            onChange={handleSendInput}
                            leftIcon={selectedEmoji || <FontAwesomeIcon icon={faFaceSmile} />}
                            onChangeLeftBtn={''}
                            onClickLeftBtn={() => {
                                setShowPicker(!showPicker);
                            }}
                        />

                        {showPicker && (
                            <EmojiPicker
                                emojiStyle="google"
                                theme={dark ? 'dark' : 'light'}
                                lazyLoadEmojis={true}
                                width={'100%'}
                                height={'400px'}
                                onEmojiClick={(e) => {
                                    onEmojiClick(e);
                                }}
                            />
                        )}

                        <div className={cx('suggestions')}>
                            <h4>Suggestions</h4>
                            <div className={cx('suggest-examples')}>
                                <div>
                                    <p>🥱 Deadline</p>
                                    <p>🤒 Out sick af</p>
                                </div>
                                <div>
                                    <p>🐧 I'm lazy</p>
                                    <p>🥰 Awesome web</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('status-footer')}>
                        <Button
                            disabled={statusBtnDisable || loading}
                            className={cx('set-status__btn')}
                            children={loading ? <LoadingIcon type={'button'} /> : 'Set status'}
                            onClick={handleSetStatus}
                        />
                        <Button
                            className={cx('clear-status-btn')}
                            children={'Clear status'}
                            onClick={() => {
                                clearStatus();
                            }}
                        />
                    </div>
                </div>
            }
        />
    );
}

export default SetStatusModal;
