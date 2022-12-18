import classNames from 'classnames/bind';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '~/firebase/config';

import styles from './MessageItem.module.scss';

const cx = classNames.bind(styles);
function MessageItem({ userUid, active = false, closestMess, unread, closestMessTime, onClick }) {
    const [accountInfo, setAccountInfo] = useState({});

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
            <img className={cx('user-avt')} alt={accountInfo.displayName} src={accountInfo.photoURL} />

            <div
                className={cx('message-content')}
                onClick={() => {
                    console.log(accountInfo);
                }}
            >
                <div className={cx('mess-detail')}>
                    <div className={cx('mess-top-content')}>
                        <h4 className={cx('user-name')}>{accountInfo.displayName}</h4>
                        <span className={cx('closest-mess-time')}>{closestMessTime}</span>
                    </div>

                    <div className={cx('mess-bottom-content')}>
                        <span className={cx('closest-mess', unread && 'unread')}>{closestMess}</span>
                        {unread && <span className={cx('unread-count')}></span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageItem;
