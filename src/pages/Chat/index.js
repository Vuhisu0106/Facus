import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Chat.module.scss';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { ChatLayout, ChatSidebar, EmptyChat } from '~/layouts/components/Message';

const cx = classNames.bind(styles);
function Chat() {
    const chat = useSelector((state) => state.chat);

    return (
        <Grid type={'chat'} className={cx('wrapper')}>
            <GridRow>
                <GridColumn l={12} m={12} s={12} className={cx('chat-col')}>
                    <div className={cx('container')}>
                        <ChatSidebar />
                        {chat.chatId === 'null' || (chat.chatId && chat.isAddChatVisible) ? (
                            <EmptyChat />
                        ) : (
                            <ChatLayout />
                        )}
                    </div>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Chat;
