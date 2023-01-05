import classNames from 'classnames/bind';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '~/firebase/config';
import { UserName } from '../AccountItem';

import styles from './MessageItem.module.scss';

const cx = classNames.bind(styles);
function MessageItem({
    userUid,
    active = false,
    closestMess,
    closestMessTime,
    onClick,
    unread = false,
    noMessages = false,
    lastMessageIsImage = false,
}) {
    const [accountInfo, setAccountInfo] = useState({});
    const [avatarLoading, setAvatarLoading] = useState(false);

    useEffect(() => {
        const getCommenterInfo = () => {
            const unsub = onSnapshot(doc(db, 'users', userUid), (doc) => {
                Object.keys(doc.data()).length > 0 && setAccountInfo(doc.data());
            });
            return () => {
                unsub();
            };
        };

        userUid && getCommenterInfo();
    }, [userUid]);
    return (
        <div className={cx('wrapper', active && 'active')} onClick={onClick}>
            <div className={cx('user-avt-wrapper')}>
                {avatarLoading ? null : <div className={cx('user-avt--loading')} />}
                <img
                    className={cx('user-avt')}
                    alt={accountInfo.displayName}
                    src={accountInfo.photoURL}
                    style={avatarLoading ? {} : { display: 'none' }}
                    onLoad={() => {
                        setAvatarLoading(true);
                    }}
                />
            </div>

            <div className={cx('message-content')}>
                <div className={cx('mess-detail')}>
                    <div className={cx('mess-top-content')}>
                        <UserName userName={accountInfo.displayName} size={'medium'} isAdmin={accountInfo.isAdmin} />

                        <span className={cx('closest-mess-time')}>{closestMessTime}</span>
                    </div>

                    <div className={cx('mess-bottom-content')}>
                        <span
                            className={cx(
                                'closest-mess',
                                unread && 'unread',
                                (noMessages || lastMessageIsImage) && 'italic-text',
                            )}
                        >
                            {noMessages ? 'No messages yet' : lastMessageIsImage ? 'An image sent' : closestMess}
                        </span>
                        {unread && <span className={cx('unread-count')}></span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageItem;
