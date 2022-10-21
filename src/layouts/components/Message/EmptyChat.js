import classNames from 'classnames/bind';

import ChatSearch from '~/components/Search/ChatSearch';
import { useApp } from '~/context/AppContext';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);
function EmptyChat() {
    const { isAddChatVisible, setIsAddChatVisible, checkDark } = useApp();

    return isAddChatVisible === true ? (
        <div className={cx('chat-wrapper', checkDark('dark-empty-search-chat'))}>
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
        <div className={cx('empty-chat-wrapper', checkDark('dark-empty-chat'))}>
            <h2>Select a chat or start a new conversation!</h2>
        </div>
    );
}

export default EmptyChat;
