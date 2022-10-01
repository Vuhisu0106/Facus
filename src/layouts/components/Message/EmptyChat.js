import classNames from 'classnames/bind';

import ChatSearch from '~/components/Search/ChatSearch';
import { useApp } from '~/context/AppContext';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);
function EmptyChat() {
    const { isAddChatVisible, setIsAddChatVisible } = useApp();

    return isAddChatVisible === true ? (
        <div className={cx('chat-wrapper')}>
            <div className={cx('chat-header')}>
                <span className={cx('to')}>To:</span>
                <ChatSearch
                    className={cx('chat-header-input')}
                    type="text"
                    placement={'bottom-start'}
                    autoFocus={true}
                />
            </div>
        </div>
    ) : (
        <div className={cx('empty-chat-wrapper')}>
            <h1>Let's chat</h1>
        </div>
    );
}

export default EmptyChat;
