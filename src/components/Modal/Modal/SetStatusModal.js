import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPicker from 'emoji-picker-react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from '~/components/Modal/Modal.module.scss';
import { useUI } from '~/context/UIContext';
import Modal from '..';
import { updateDocument } from '~/firebase/services';
import { useAuth } from '~/context/AuthContext';
import { deleteField } from 'firebase/firestore';

const cx = classNames.bind(styles);
function SetStatusModal({ onClose }) {
    const { checkDark, dark } = useUI();
    const { currentUser } = useAuth();

    const [selectEmoji, setSelectEmoji] = useState('');
    const [text, setText] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [statusBtnDisable, setStatusBtnDisable] = useState(true);

    const onEmojiClick = (e) => {
        setShowPicker(false);
        setSelectEmoji(e.emoji);
    };

    const clearStatus = async () => {
        await updateDocument('users', currentUser.uid, {
            status: deleteField(),
        });
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
        if (selectEmoji && text) {
            setStatusBtnDisable(false);
        } else {
            setStatusBtnDisable(true);
        }
    }, [selectEmoji, text]);

    const handleSetStatus = async () => {
        await updateDocument('users', currentUser.uid, {
            status: {
                icon: selectEmoji,
                text,
            },
        });
        onClose();
    };

    return (
        <Modal
            title="Edit status"
            onClose={onClose}
            children={
                <div className={cx('set-status-wrapper', checkDark('dark-set-status'))}>
                    <div className={cx('status-content')}>
                        <Input
                            value={text}
                            className={cx('status-bar')}
                            inputClassName={cx('status-input')}
                            placeHolder="What's happening?"
                            classNameLeftBtn={cx('status-icon')}
                            onChange={handleSendInput}
                            leftIcon={selectEmoji || <FontAwesomeIcon icon={faFaceSmile} />}
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
                                    <p>🐧 Just feeling lazy</p>
                                    <p>🥰 This web is pềct</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('status-footer')}>
                        <Button
                            disabled={statusBtnDisable}
                            className={cx('set-status-btn')}
                            children={'Set status'}
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
