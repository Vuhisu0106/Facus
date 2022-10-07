import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase';
import styles from './Profile.module.scss';
import WrapperModal from '~/components/Wrapper';

const cx = classNames.bind(styles);
function Follower() {
    const [followerList, setFollowerList] = useState();
    var selectUser = localStorage.getItem('selectUser');

    useEffect(() => {
        const getFollowerList = () => {
            const unsub = onSnapshot(doc(db, 'follower', selectUser), (doc) => {
                setFollowerList(doc.data());
                console.log(selectUser);
            });

            return () => {
                unsub();
            };
        };

        selectUser && getFollowerList();
    }, [selectUser]);

    return (
        <WrapperModal className={cx('follower')}>
            <h2>Follower</h2>
            {followerList &&
                Object.entries(followerList).map((follower) => (
                    <div key={follower[0]} className={cx('account')}>
                        <img
                            className={cx('account-avt')}
                            alt={follower[1].userInfo.displayName}
                            src={follower[1].userInfo.photoURL}
                        />
                        <div className={cx('account-info')}>
                            <h1 className={cx('account-name')}>{follower[1].userInfo.displayName}</h1>
                            <span className={cx('account-bio')}>Hello World</span>
                        </div>
                    </div>
                ))}
        </WrapperModal>
    );
}

export default Follower;
