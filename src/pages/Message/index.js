import classNames from 'classnames/bind';

import styles from './Message.module.scss';
import Chat from '~/layouts/components/Message/Chat';
import ChatSidebar from '~/layouts/components/Message/ChatSidebar';
import EmptyChat from '~/layouts/components/Message/EmptyChat';
import { useChat } from '~/context/ChatContext';
import { useUI } from '~/context/UIContext';

const cx = classNames.bind(styles);
function Message() {
    const { isAddChatVisible, setIsAddChatVisible, checkDark } = useUI();
    const { data } = useChat();
    return (
        <div className={cx('container', checkDark())}>
            <div className={cx('wrapper')}>
                <ChatSidebar />
                {data.chatId === 'null' || (data.chatId && isAddChatVisible) ? <EmptyChat /> : <Chat />}
            </div>
        </div>
    );
}

export default Message;
