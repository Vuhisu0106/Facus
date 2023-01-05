import classNames from 'classnames/bind';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { UserAvatar, UserName } from '~/components/AccountItem';
import { db } from '~/firebase/config';
import styles from '~/layouts/components/Message/Chat.module.scss';

const cx = classNames.bind(styles);
function ChatHeader({ uid }) {
    const [accountInfo, setAccountInfo] = useState({});

    useEffect(() => {
        const getCommenterInfo = () => {
            const unsub = onSnapshot(doc(db, 'users', uid), (doc) => {
                Object.keys(doc.data()).length > 0 && setAccountInfo(doc.data());
            });
            return () => {
                unsub();
            };
        };

        uid && getCommenterInfo();
    }, [uid]);
    return (
        <div className={cx('chat-header')}>
            <UserAvatar
                className={cx('user-avt')}
                userUid={accountInfo.uid}
                userName={accountInfo.displayName}
                avatar={accountInfo.photoURL}
                diameter="38px"
            />
            <UserName
                userUid={accountInfo.uid}
                userName={accountInfo.displayName}
                size={'medium'}
                isAdmin={accountInfo.isAdmin}
            />
        </div>
    );
}

export default ChatHeader;
