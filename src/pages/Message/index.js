import classNames from 'classnames/bind';

import styles from './Message.module.scss';
import Chat from '~/layouts/components/Message/Chat';
import ChatSidebar from '~/layouts/components/Message/ChatSidebar';

const cx = classNames.bind(styles);
function Message() {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <ChatSidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Message;
