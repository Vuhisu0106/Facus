import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPicker from 'emoji-picker-react';
import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';
import Input from '~/components/Input';
import styles from '~/components/Modal/Modal.module.scss';
import { useApp } from '~/context/AppContext';
import Modal from '..';

const cx = classNames.bind(styles);
function SetStatusModal() {
    const { setIsEditStatusModal } = useApp();

    const [selectEmoji, setSelectEmoji] = useState('');
    const [message, setMessage] = useState('');
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (e) => {
        setShowPicker(false);
        setSelectEmoji(e.emoji);
    };

    const clearStatus = () => {
        setSelectEmoji('');
        setMessage('');
        setShowPicker(false);
    };
    return (
        <Modal
            title="Edit status"
            onClick={() => {
                setIsEditStatusModal(false);
            }}
            children={
                <div className={cx('set-status-wrapper')}>
                    <div className={cx('status-content')}>
                        <Input
                            className={cx('status-bar')}
                            inputClassName={cx('status-input')}
                            placeHolder="What's happening?"
                            classNameLeftBtn={cx('status-icon')}
                            leftIcon={selectEmoji ? selectEmoji : <FontAwesomeIcon icon={faFaceSmile} />}
                            onClickLeftBtn={() => {
                                setShowPicker(!showPicker);
                            }}
                        />

                        {showPicker && (
                            <EmojiPicker
                                emojiStyle="google"
                                lazyLoadEmojis={true}
                                height={'400px'}
                                onEmojiClick={(e) => onEmojiClick(e)}
                            />
                        )}

                        <div className={cx('suggestions')}>
                            <h4>Suggestions</h4>
                            <div className={cx('suggest-examples')}>
                                <div>
                                    <p>😁 On vacation</p>
                                    <p>😁 Out sick</p>
                                </div>
                                <div>
                                    <p>😁 Working from home</p>
                                    <p>😁 Focusing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('status-footer')}>
                        <Button className={cx('set-status-btn')} children={'Set status'} />
                        <Button className={cx('clear-status-btn')} children={'Clear status'} onClick={clearStatus} />
                    </div>
                </div>
            }
        />
    );
}

export default SetStatusModal;
