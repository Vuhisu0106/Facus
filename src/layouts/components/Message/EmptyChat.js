import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import ChatSearch from '~/components/Search/ChatSearch';

import styles from './Chat.module.scss';

const cx = classNames.bind(styles);
function EmptyChat() {
    const chat = useSelector((state) => state.chat);

    return chat.isAddChatVisible ? (
        <div className={cx('chat-wrapper')}>
            <div className={cx('chat-header')}>
                <span>To:</span>
                <ChatSearch
                    className={cx('chat-header-input')}
                    type="text"
                    placement={'bottom-start'}
                    autoFocus={true}
                />
            </div>
        </div>
    ) : (
        <div className={cx('empty-chat__wrapper')}>
            <img className={cx('empty-chat__image')} src="images/emptyChatImg.png" alt="" />
            <h2>Select a chat or start a new conversation!</h2>
        </div>
    );
}

export default EmptyChat;
